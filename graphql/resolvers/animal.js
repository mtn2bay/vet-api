const Animal = require('../../models/animal.js');
const Owner = require('../../models/owner.js');

module.exports = {
  Query: {
    animals: async () => {
      const animals = await Animal.find()
        .populate('owner')
        .catch(err => { throw err; });
        
      return animals.map((animal) => {
        return { 
          ...animal._doc
        };
      });
    } 
  },
  Mutation: {
    createAnimal: async (root, args) => {
      const { name, species, owner } = args.input;
      const animal = new Animal({ name, species, owner });
      let createdAnimal;

      try {
        const result = await animal.save();
        createdAnimal = { ...result._doc };

        // fetches owner of created animal
        const ownerObj = await Owner.findById(owner);

        if (!ownerObj) {
          throw new Error('Owner not found.');
        }

        // adds created animal to owner
        ownerObj.animals.push(createdAnimal);

        // populates created animal with owner details for response
        createdAnimal.owner = ownerObj;

        await ownerObj.save();
        return createdAnimal;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  }
};