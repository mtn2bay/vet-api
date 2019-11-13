const { gql } = require('apollo-server-express');

module.exports = gql`
type Animal { 
  _id: ID!
  name: String!
  species: String!
  owner: Owner!
}

type Owner {
  _id: ID!
  name: String!
  phone: String!
  animals: [Animal]
}

type Appointment {
  _id: ID!
  animal: Animal!
  owner: Owner!
  date: String!
}

type Query { 
  animals: [Animal!]!
  owners: [Owner!]!
  appointments: [Appointment!]!
}

input AnimalInput {
  name: String!
  species: String!
  owner: ID!
}

input OwnerInput {
  name: String!
  phone: String!
}

input AppointmentInput {
  animal: ID!
  owner: ID!
  date: String!
}

type Mutation { 
  createAnimal(input: AnimalInput): Animal
  createOwner(input: OwnerInput): Owner
  createAppointment(input: AppointmentInput): Appointment
  cancelAppointment(appointmentID: ID!): String
}
`;