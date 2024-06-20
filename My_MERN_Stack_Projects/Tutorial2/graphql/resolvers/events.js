const Event = require('../../models/event.js'); // Ensure this path is correct and the Event model is defined properly
const { transformEvent, } = require('./merge.js');



module.exports = {
    events: async () => {
      try {
        const events = await Event.find();
        return events.map(event => {
          return transformEvent(event);
        });
      } catch (err) {
        throw err;
      }
    },
    createEvent: async (args) => {
      const event = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
        date: new Date(args.eventInput.date),
        creator: '66729cf0263ff64f6498fc53' // Static ID for testing; replace with dynamic ID
      });
  
      let createdEvent;
      try {
        const result = await event.save();
        createdEvent = transformEvent(result);
        const user = await User.findById('66729cf0263ff64f6498fc53'); // Static ID for testing; replace with dynamic ID
        if (!user) {
          throw new Error('User not found.');
        }
        user.createdEvents.push(event);
        await user.save();
        return createdEvent;
      } catch (err) {
        console.log(err);
        throw err;
      }
    }
  };