const endpoint_constants = {
    SERVER: "https://swapi.co",
    getAllCategories: function() {
        return this.SERVER + "/api/"
    },
    getCategory: function(category) {
        return this.SERVER + "/api/" + category + "/"
    }
};

export default endpoint_constants