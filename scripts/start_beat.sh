celery -A ico_portal worker -B -E -Q events_beat -c 1 -n events_watcher -l INFO
