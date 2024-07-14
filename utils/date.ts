

export const getDefaultCurrencyFormat = (_currency: number | string | undefined): string => {

    if (!_currency)

        return ''

    let currencyNumber: number

    if (typeof _currency === 'string') {

        currencyNumber = parseFloat(_currency)

    }

    else {

        currencyNumber = _currency

    }

    const formattedCurrency = new Intl.NumberFormat(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(currencyNumber)

    return formattedCurrency

}



export const getMonthName = (monthNumber: string) => {

    const { t } = useI18n()

    switch (monthNumber) {

        case '1':

            return t('months.january')

        case '2':

            return t('months.february')

        case '3':

            return t('months.march')

        case '4':

            return t('months.april')

        case '5':

            return t('months.may')

        case '6':

            return t('months.june')

        case '7':

            return t('months.july')

        case '8':

            return t('months.august')

        case '9':

            return t('months.september')

        case '10':

            return t('months.october')

        case '11':

            return t('months.november')

        case '12':

            return t('months.december')

        default:

            return ''

    }

}



export const getMonthNumber = (monthName: string | undefined): string => {

    const { t } = useI18n()

    switch (monthName) {

        case t('months.january'):

            return '1'

        case t('months.february'):

            return '2'

        case t('months.march'):

            return '3'

        case t('months.april'):

            return '4'

        case t('months.may'):

            return '5'

        case t('months.june'):

            return '6'

        case t('months.july'):

            return '7'

        case t('months.august'):

            return '8'

        case t('months.september'):

            return '9'

        case t('months.october'):

            return '10'

        case t('months.november'):

            return '11'

        case t('months.december'):

            return '12'

        case undefined:

            return ''

        default:

            return ''

    }

}



export const formatTwoDigits = (value: number | string): string => {

    if (typeof value === 'string')

        value = parseInt(value)

    return value < 10 ? `0${value}` : value.toString()

}



export const getPlaceHolderDateFormat = (_date: string, _monthName?: boolean) => {

    const date = new Date(_date)

    const day = date.getDate()

    const month = date.getMonth() + 1

    const monthName = getMonthName((date.getMonth() + 1).toString())

    const year = date.getFullYear()

    if (_monthName)

        return `${formatTwoDigits(day)} ${monthName} ${year}`

    else

        return `${formatTwoDigits(day)}.${formatTwoDigits(month)}.${year}`

}



export const getStartDate = (_date: string | Date): string => {

    const date = new Date(_date)

    if (date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {

        date.setHours(0, 0, 0, 0)

    }

    return date.toISOString()

}



export const getEndDate = (_date: string | Date): string => {

    const date = new Date(_date)

    if (date.getHours() !== 0 || date.getMinutes() !== 0 || date.getSeconds() !== 0 || date.getMilliseconds() !== 0) {

        date.setHours(23, 59, 59, 999)

    }

    return date.toISOString()

}



export const formatDate = (transactionDate: string): string => {

    const date = new Date(transactionDate)

    const dd = String(date.getDate()).padStart(2, '0')

    const mm = String(date.getMonth() + 1).padStart(2, '0')

    const yyyy = date.getFullYear()



    return `${dd}-${mm}-${yyyy}`

}

