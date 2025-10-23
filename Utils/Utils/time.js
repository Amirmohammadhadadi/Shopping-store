const isExpired = (expire, startTime) => {
    return expire.getTime() > startTime.getTime()
}

export default isExpired