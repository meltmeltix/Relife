class Action {
    constructor(friendlyName, url, isPrimary = false) {
        this.friendlyName = friendlyName;
        this.url = url;
        this.isPrimary = isPrimary;
    }
}

export default Action