export class GuidGenerator {
    private static readonly guidTemplate = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';

    static generate() {
        const key = this.guidTemplate.replace(/[xy]/g,  (c) => {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });

        return key;
    }
}