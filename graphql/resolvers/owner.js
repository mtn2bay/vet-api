const Owner = require('../../models/owner.js');

module.exports = {
  Query: {
    owners: async () => {
      const owners = await Owner.find()
        .populate('animals')
        .catch(err => { throw err; });

      return owners.map((owner) => {
        return { ...owner._doc };
      });
    }
  },
  Mutation: {
    createOwner: async (root, args) => {
      const { name, phone } = args.input;
      const owner = new Owner({ name, phone });

      const result = await owner.save()
        .catch(err => {
          console.log(err);
          throw err;
        });

      return { ...result._doc };
    }
  }
};