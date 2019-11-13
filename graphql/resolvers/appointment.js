const Appointment = require('../../models/appointment.js');

module.exports = {
  Query: {
    appointments: async () => {
      const appointments = await Appointment.find()
        .populate('animal')
        .populate('owner')
        .catch(err => { throw err; });

      return appointments.map(appointment => { 
        return { ...appointment._doc };
      });
    } 
  },
  Mutation: {
    createAppointment: async (root, args) => {
      const { animal, owner, date } = args.input;
      const appointment = new Appointment({ animal, owner, date });

      const result = await appointment.save()
        .catch(err => {
          console.log(err);
          throw err;
        });

      return { ...result._doc };
    },
    cancelAppointment: async (root, args) => {
      const animal = await Appointment.findById(args.appointmentId).catch(err => { throw err; });
      await Appointment.deleteOne({ _id: args.appointmentId }).catch(err => { throw err; });
      return { ...animal._doc };
    }
  }
};