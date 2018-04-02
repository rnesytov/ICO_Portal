import React from 'react'
import {connect} from 'react-redux'

const PhaseStats = ({
    phaseName,
    discountPercent,
    endTime
}) => {
    const endIn = new Date(endTime * 1000).toDateString()

    return (
        <div>
            <div><b>Current ico phase</b></div>
            <div>
                <b>Name: </b>
                {phaseName}
            </div>
            <div>
                <b>Discount: </b>
                {discountPercent}%
            </div>
            <div>
                <b>End date: </b>
                {endIn}
            </div>
        </div>
    )
}

const mapStateToProps = ({ICOInfo}) => ({
    discountPercent: ICOInfo.get('currentPhase').get('discountPercent'),
    endTime: ICOInfo.get('currentPhase').get('endTime'),
    phaseName: ICOInfo.get('currentPhase').get('name'),
})

export default connect(mapStateToProps)(PhaseStats)