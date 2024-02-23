import axios from "axios"
import { formatDateDate, formatDateDay, formatDateMonth } from "../lib/utils"

export const specialEventCalls = {
    getAllSpecialsEvents: (currentYear, currentMonth, today, towns, eventsOrSpecials) => {
        const config = {
            params: {
                towns: towns,
                eventsOrSpeicals: eventsOrSpecials
            }
        }
        return axios.get(`${process.env.REACT_APP_API_ENDPOINT}/api/get_specials/${currentYear}-${formatDateMonth(currentMonth)}-${formatDateDate(today)}/${formatDateDay(currentYear, formatDateMonth(currentMonth), formatDateDate(today))}`, config)
    }

    
}