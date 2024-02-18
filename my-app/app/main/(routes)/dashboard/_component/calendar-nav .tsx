const CalendarNav = () => {
    const selectedDate = '17';
    const weekDays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
    const dates = ['14', '15', '16', '17', '18', '19', '20']; // Sample dates

    return (
        <div className="bg-white p-4 ">
            <div className="flex items-center justify-between text-xs">
                {weekDays.map((day, index) => (
                    <div key={day} className={`text-center cursor-pointer ${selectedDate === dates[index] ? 'text-red-500 font-semibold' : 'text-gray-600'}`}>
                        <div>{day}</div>
                        <div className={`${selectedDate === dates[index] ? 'p-2 rounded-full bg-red-100' : ''}`}>{dates[index]}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CalendarNav;
