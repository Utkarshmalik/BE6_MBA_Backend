
const releaseStatus={

    released:"RELEASED",
    unreleased:"UNRELEASED",
    blocked:"BLOCKED"
}

const userTypes ={
    customer:"CUSTOMER",
    client:"CLIENT",
    admin:"ADMIN"
}

const userStatus = {
    pending:"PENDING",
    approved:"APPROVED",
    rejected:"REJECTED"
}

module.exports = {
    releaseStatus:releaseStatus,
    userTypes,
    userStatus,
    ticketPrice:250
}

