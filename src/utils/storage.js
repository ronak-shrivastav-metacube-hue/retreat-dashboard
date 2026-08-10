export const storage = {

    set(key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },

    get(key) {
        const value = localStorage.getItem(key);

        if (!value) {
            return null;
        }

        try {
            return JSON.parse(value);
        } catch {
            return value;
        }
    },

    remove(key) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    }
};
