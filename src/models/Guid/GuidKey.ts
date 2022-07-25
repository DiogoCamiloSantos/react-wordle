import { GuidGenerator } from "./GuidGenerator";

class GuidKey {
    
    constructor (private key: string = GuidGenerator.generate()) {
        
    }

    get(): string {
        return this.key;
    }
}

export default new GuidKey().get();