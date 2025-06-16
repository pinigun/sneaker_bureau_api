from datetime import date, timedelta


class ExtraTools:
    def get_monday() -> date:
        '''Return monday of this week'''
        today = date.today()
        return today - timedelta(days=today.weekday())


    def get_saturday() -> date:
        '''Return saturday of this week'''
        today = date.today()
        return today + timedelta(days=(6 - today.weekday()))
