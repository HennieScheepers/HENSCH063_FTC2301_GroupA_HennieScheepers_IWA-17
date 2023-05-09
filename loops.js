const MONTHS = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

const getDaysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()

// Only edit below 

/**
 * Creates an array with specified length
 */
const createArray = (length) => {
    const result = []
    // fixed for loop
    for (let i = 0; i < length; i++) {
        result[i] = ''
    }
    return result
}

const createData = () => {
    let today = new Date()
    let startDay = new Date(today.getFullYear(), today.getMonth(), 1)
    startDay = startDay.getDay()
    /**
     * Days in the current month
     */
    //added function to get the total amount of days in the month
    const daysInMonth = getDaysInMonth(today);
        Date.prototype.getWeekOfMonth = function () {
        var firstDay = new Date(this.setDate(1)).getDay();
        var totalDays = new Date(this.getFullYear(), this.getMonth() + 1, 0).getDate();
        return Math.ceil((firstDay + totalDays) / 7);
    }
    // Calculation of total weeks in month
        let totalWeeks = new Date().getWeekOfMonth();
    // create array with the correct number of weeks
    const weeks = createArray(totalWeeks)
    const days = createArray(7)
    let value = [{
        week: [],
        day: []
    }]

    let dayCounter = 1
    let dayIndex = 0
    let dayIndexCatchup = 0
    // Fill the week array
    for (let weekIndex in weeks) {
        value[0].week.push({
            value: parseInt(weekIndex) + 1
        });
        // while(parseInt(dayIndex) !== startDay){
        //         value[0].day.push({
        //             dayOfWeek: '',
        //             value:''
        //         })
        //         dayIndex ++
        //     }
        // Fill the day array 
        for (dayIndex in days) {
            let isValid = dayCounter <= daysInMonth ;
            let newValue = parseInt(dayIndex) + startDay

            if ((parseInt(dayIndexCatchup)) < startDay){
                value[0].day.push({
                    dayOfWeek: '',
                    value:''
                })
                dayIndexCatchup ++
            } else {

                // Check if overall day counter does not exceed the days in month
                // Check if day in week counter does not exceed the number of days in a week
                if (isValid && newValue < 8) {
                    value[0].day.push({
                        dayOfWeek: newValue,
                        value: dayCounter
                    }
                    )
                    dayCounter ++
                } else if (isValid) {
                    value[0].day.push({
                        dayOfWeek: newValue - 7,
                        value: dayCounter
                    }
                    )
                    dayCounter++
                }
            }
        }
    }
    return value
}

console.log(createData())

//Fixed the addCell function
const addCell = (existing, classString, value) => {
    const result = /* html */ `
        <td class="${classString}">
            ${value}
        </td>

        ${existing}
    `
    return result
}

const createHtml = (data) => {
    let today = new Date()
    let result = ''
    const days = createArray(7)
    let dayOfMonthCounter = 0;
    let daysInMonth = getDaysInMonth(today)
    let startDay = new Date(today.getFullYear(), today.getMonth(), 1)
    startDay = startDay.getDay()

    // Nested for loops to create the days in the week and the weeks
    // Create the week value with days next to it
    for (let weekNumber in data[0].week) {
        let dayOfWeek = 0
        let inner = ""
        let longString = ""
        inner = addCell(inner, 'table__cell table__cell_sidebar', `Week ${data[0].week[weekNumber].value}`)
        const isAlternate = data[0].weekValue % 2 === 0
        
        for (dayOfWeek in days) {
            let isValid = dayOfMonthCounter <= daysInMonth + startDay - 1 
            if (isValid) {
                dayOfWeek = parseInt(dayOfWeek)
                let classString = 'table__cell'
                const isToday = today.getDate() === data[0].day[dayOfMonthCounter].value
                let dayNumber = parseInt(data[0].day[dayOfMonthCounter].dayOfWeek )
                const isWeekend = (dayNumber === 6 || dayNumber  === 7)? true : false
                let innerDay = ''
                if (isToday) classString = `${classString} table__cell_today`
                if (isWeekend) classString = `${classString} table__cell_weekend`
                if (isAlternate) classString = `${classString} table__cell_alternate`
                longString += addCell(innerDay, classString, data[0].day[dayOfMonthCounter].value)
                dayOfMonthCounter ++
            }
        }
        result += `<tr>${inner}${longString}</tr>`

    }
    return result
}

//Only edit above

const current = new Date()
document.querySelector('[data-title]').innerText = `${MONTHS[current.getMonth()]} ${current.getFullYear()}`

const data = createData()
document.querySelector('[data-content]').innerHTML = createHtml(data)