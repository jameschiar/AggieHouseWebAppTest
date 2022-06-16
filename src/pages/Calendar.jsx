import NavBar from '../components/NavBar.jsx';
import React from 'react';

 function showCalendar() {
   return (
     <main>
       <NavBar/>
      
       <h2>Calendar</h2>
     </main>
   );
 }

 export default showCalendar;


// import './Calendar.css';
// import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
// import format from 'date-fns/format';
// import parse from 'date-fns/parse';
// import startOfWeek from 'date-fns/startOfWeek';
// import getDay from 'date-fns/getDay';
// import 'react-big-calendar/lib/css/react-big-calendar.css';
// import DatePicker from 'react-datepicker';

// const locales = {
//   'en-US': require('date-fns/locale/en-US')
// };

// const localizer = dateFnsLocalizer({
// 	format,
// 	parse,
// 	startOfWeek,
// 	getDay
// });

// const events = [
// 	{
// 		title: 'Shift 1',
// 		start: new Date(2022, 6, 0),
// 		end: new Date(2022, 6, 0)
// 	},
// 	{
// 		title: 'Shift 2',
// 		start: new Date(2022, 6, 0),
// 		end: new Date(2022, 6, 0)
// 	},
// 	{
// 		title: 'Shift 3',
// 		start: new Date(2022, 6, 0),
// 		end: new Date(2022, 6, 0)
// 	}
// ];

// function ShowCalendar() {
// 	return (
// 		<main>
// 			<NavBar />
// 			<div>
// 				<Calendar
// 					localizer={localizer}
// 					events={events}
// 					startAccessor="start"
// 					endAccessor="end"
// 					style={{ height: 500, margin: '50px' }}
// 				/>
// 			</div>
// 		</main>
// 	);
// }

// export default ShowCalendar;
