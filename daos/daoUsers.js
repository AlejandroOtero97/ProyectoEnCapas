import containerMongoose from "../containers/containerMongoose.js";

class daoUsers extends containerMongoose{
    constructor(collection) {
        super(collection)
    }
    async findByUsername(username) {
        const userFinded = await this.collection.findOne({ username });
        return userFinded;
    }
    async saveIfDontExists(user) {
        const userFinded = await this.findByUsername(user.username);
        let added;
        if(!userFinded){
            added= await this.save(user);
        }
        return added;
    }
}

export default daoUsers;