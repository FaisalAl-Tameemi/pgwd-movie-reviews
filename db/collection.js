
const lowdb = require('lowdb');
// initiate a lowdb instance from the file `./db.json`
// the `db` variable below will be in the scope of this module
// and therefore available to all the methods below even when called
// in other files.
const jsonDB = lowdb(`${__dirname}/database.json`);

const initCollection = (collection, options) => {
  // if the reset flag is set to true
  if (options.reset && options.reset === true) {
    // set the collection to an empty array as a default value
    jsonDB.set(collection, []).value();
    // this will overwrite any values that previous existed in that file
    // to avoid overwritting any previous data, use `jsonDB.has(collection)`
    // to check if the collections exists prior to setting the default
  }

  /**
   * A method to create an entry in the collection
   */
  const insert = (data) => {
    return jsonDB.get(collection).push(data).value();
  };

  /**
   * A method to find an entry within a collection
   */
  const find = (id) => {
    return jsonDB.get(collection).find({ id }).value();
  };

  /**
   * Updates an entry in a collection using its ID
   */
  const update = (id, data) => {
    return jsonDB.get(collection).find({ id }).assign(data).value();
  };

  /**
   * A method to remove an entry from a collection
   */
  const remove = (id) => {
    return jsonDB.get(collection).remove({ id }).value();
  };

  /**
   * Returns the count of the collection entries
   */
  const count = () => {
    return jsonDB.get(collection).value().length;
  };

  // return the basic 3 methods for the collection specified
  return {
    insert,
    find,
    update,
    remove,
    count
  };
}

module.exports = {
  initCollection
};
