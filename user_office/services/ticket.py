import mimetypes
from django.db import DatabaseError
from django.utils.encoding import smart_text
from django.core.exceptions import ValidationError
from oslash import Left

from ico_portal.utils.datetime import datetime
from ico_portal.utils.service_object import ServiceObject, service_call
from helpdesk.models import Queue, Ticket, FollowUp, Attachment


class ValidationErrorLeft(Left):
    def bind(self, func):
        return ValidationError(self._get_value())


class _Base(ServiceObject):
    def get_or_create_queue(self, context):
        slug = context.queue__slug
        title = context.queue__title

        queue = Queue.objects.filter(slug=slug)

        if queue.exists():
            return self.success(queue=queue.first())
        else:
            queue = Queue(slug=slug, title=title)

            try:
                queue.save()

                return self.success(queue=queue)
            except DatabaseError as e:
                return self.fail(e)

    def create_ticket(self, context):
        ticket = Ticket(title=context.title,
                        created=datetime.utcnow(),
                        status=Ticket.OPEN_STATUS,
                        queue=context.queue,
                        reporter=context.reporter)

        try:
            ticket.save()

            return self.success(ticket=ticket)
        except DatabaseError as e:
            return self.fail(e)

    def process_attached_files(self, context):
        def process_file(f):
            if f.size:
                filename = smart_text(f.name)
                att = Attachment(
                    followup=context.follow_up,
                    file=f,
                    filename=filename,
                    mime_type=f.content_type or
                    mimetypes.guess_type(f, strict=False)[0] or
                    'application/octet-stream',
                    size=f.size,
                )

                att.full_clean()
                att.save()

                return att

        if context.attached_files:
            try:
                attachments = list(filter(None, map(process_file, context.attached_files)))

                return self.success(attachments=attachments)
            except ValidationError as e:
                return self.fail_with(ValidationErrorLeft(e.message_dict))
        else:
            return self.success()


class CreateSupportTicket(_Base):
    queue_spec = {
        'queue__slug': 'support',
        'queue__title': 'Support'
    }

    def create_description(self, context):
        follow_up = FollowUp(ticket=context.ticket,
                             title='Comment',
                             comment=context.description,
                             public=True,
                             user=context.reporter)

        try:
            follow_up.save()

            return self.success(follow_up=follow_up)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self, reporter, title, description, attached_files=None):
        return self.success(title=title, reporter=reporter,
                            description=description,
                            attached_files=attached_files,
                            **self.queue_spec) | \
                            self.get_or_create_queue | \
                            self.create_ticket | \
                            self.create_description | \
                            self.process_attached_files


class CommentTicket(_Base):
    @service_call
    def __call__(self, investor, ticket, comment, attached_files=None):
        follow_up = FollowUp(ticket=ticket,
                             title='Comment',
                             comment=comment,
                             public=True,
                             user=investor)

        try:
            follow_up.save()

            return self.success(follow_up=follow_up, attached_files=attached_files) | \
                self.process_attached_files
        except DatabaseError as e:
            return self.fail(e)


class CreateKYCTicket(_Base):
    queue_spec = {
        'queue__slug': 'kyc-requests',
        'queue__title': 'KYC Requests'
    }

    title_template = 'KYC request for user {username}'

    def get_title(self, context):
        title = self.title_template.format(username=context.reporter.email)

        return self.success(title=title)

    def create_kyc_comment(self, context):
        follow_up = FollowUp(ticket=context.ticket,
                             title='KYC link',
                             comment=context.ticket.reporter_kyc_url,
                             public=False)

        try:
            follow_up.save()

            return self.success(follow_up=follow_up)
        except DatabaseError as e:
            return self.fail(e)

    def set_ticket_id(self, context):
        kyc = context.kyc

        try:
            kyc.ticket = context.ticket
            kyc.save()

            return self.success(kyc=kyc)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self, kyc):
        return self.success(kyc=kyc, reporter=kyc.investor, **self.queue_spec) | \
            self.get_or_create_queue | \
            self.get_title | \
            self.create_ticket | \
            self.create_kyc_comment | \
            self.set_ticket_id


class UpdateKYCTicket(ServiceObject):
    follow_up_title = 'User updated KYC data'

    def find_ticket(self, context):
        ticket = context.kyc.ticket

        if ticket:
            return self.success(ticket=ticket)
        else:
            return self.fail('Ticket not found')

    def create_follow_up(self, context):
        follow_up = FollowUp(ticket=context.ticket,
                             title=self.follow_up_title,
                             public=False)

        try:
            follow_up.save()

            return self.success(follow_up=follow_up)
        except DatabaseError as e:
            return self.fail(e)

    @service_call
    def __call__(self, kyc):
        return self.success(kyc=kyc) | \
            self.find_ticket | \
            self.create_follow_up
