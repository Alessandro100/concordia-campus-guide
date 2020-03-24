import CampusEventGatherer from './CampusEventGatherer';
import CampusEvent from './CampusEvent';
import Cheerio from 'cheerio';
import PointOfInterest from './pointOfInterest';

//singleton class with lazy instantiation
class CampusEventWebScraper implements CampusEventGatherer {
    private static _instance: CampusEventWebScraper;
    private readonly _url : string;
    private readonly _events : CampusEvent[];

    private constructor() {
        this._url = "https://www.concordia.ca/events.html";
    }

    public static get instance() : CampusEventWebScraper {
        if (!CampusEventWebScraper._instance) {
            CampusEventWebScraper._instance = new CampusEventWebScraper();
        }
        return CampusEventWebScraper._instance;
    }

    public get url() : string {
        return this._url;
    }

    public get events() : CampusEvent[] {
        return this._events;
    }
    
    gatherCampusEvents() {
        let request = new XMLHttpRequest();
        request.open("GET", this._url);
        request.onreadystatechange = (e) => {
            if (request.readyState !== 4) {
              return;
            }
          
            if (request.status === 200) {
                this.extractEventsFromHTML(request.response);
            } else {
              console.warn('error');
            }
          };
        request.responseType = "text";
        request.send();
    }

    extractEventsFromHTML(html: string) {
        const $ = Cheerio.load(html);
        let todayEvents = [];
        //events are contained in a <div> with class item which are contained in a <div> with class c-accordion.
        //the code loops over every items and extract the event informations.
        $('.c-accordion')
            .first()
            .find('.item')
            .each(function(index, element) {
                //title is contained in title attribute of an <a> tag which is inside a <div> with class title.
                const title: string = $(element).find(".title a").attr('title');
                //description is contained in the only <p> tag.
                const description: string = $(element).find('p').html();
                //date and times are contained in the <div> next to the <div> with class lbl that contains "When".
                const whenString: string = $(element).find('.lbl:contains("When")').siblings('.rte').first().html();
                const dates: [Date, Date] = CampusEventWebScraper.instance.extractDates(whenString);
                const startDate: Date = dates[0];
                const endDate: Date = dates[1];
                /*const location: PointOfInterest = 
                todayEvents.push(new CampusEvent(title, description, startDate, endDate, location));*/
        });
    }

    extractDates(whenString: string) {
        //the code in this function is intentionally verbose to make it easy to understand what's happening.

        //adding date portion
        const whenArr: string[] = whenString.trim().replace(/,/g,'').split(' ');
        let dates: [Date, Date] = [new Date(whenArr[0] + ' ' + whenArr[1] + ' ' + whenArr[2]), new Date(whenArr[0] + ' ' + whenArr[1] + ' ' + whenArr[2])];

        //splitting time portion e.g. 7:30 to 7 and 30
        const startTimeArr: string[] = whenArr[3].split(':');
        let startHour: number = parseInt(startTimeArr[0]);
        const endTimeArr: string[] = whenArr[6].split(':');
        let endHour: number = parseInt(endTimeArr[0]);

        //converting to 24H time
        startHour = (whenArr[4] === 'p.m.' ? startHour + 12 : startHour);
        endHour = (whenArr[7] === 'p.m.' ? endHour + 12 : endHour);

        //adding time portion to dates
        dates[0].setHours(startHour);
        dates[0].setMinutes(parseInt(!startTimeArr[1] ? '0' : startTimeArr[1]));
        dates[1].setHours(endHour);
        dates[1].setMinutes(parseInt(!endTimeArr[1] ? '0' : endTimeArr[1]));

        //note that js dates are stored in utc

        return dates;
    }

}

export default CampusEventWebScraper;

