module.exports = {
    getEventsFullInfo: (events, eventsDescription) => {
        return events.reduce((accum, event) => {
            const { id: eventID, event: eventName} = event;
            
            const eventInfo = eventsDescription.find((eventDescription) => {
                return eventDescription.id === eventID;
            });
    
            accum.push({
                id: eventID,
                event: eventName,
                discovery: eventInfo || {}
            });
            
            return accum;
        }, []);
    }
};