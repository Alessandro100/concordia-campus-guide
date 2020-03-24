interface CampusEventGatherer {
    /*
    using an interface to make it easier to add API call
    in the future with another class e.g. CampusEventAPICall
    while also keeping the option for webscraping.
    */
    gatherCampusEvents(): void;
}

export default CampusEventGatherer;