import CampusEventGatherer from "./CampusEventGatherer";
import CampusEvent from "./CampusEvent";

//singleton class
class CampusEventWebScraper implements CampusEventGatherer {
    private static _instance: CampusEventWebScraper;

    private constructor() {
    }

    public static get instance() : CampusEventWebScraper {
        if (!CampusEventWebScraper._instance) {
            CampusEventWebScraper._instance = new CampusEventWebScraper();
        }
        return CampusEventWebScraper._instance;
    }
    
    getEvents() {
        //to be implemented
    }
}

export default CampusEventWebScraper;