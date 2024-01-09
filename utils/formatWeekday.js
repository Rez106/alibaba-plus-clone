export default function (day) {
   const englishToPersianMap = {
      'saturday': 'شنبه',
      'sunday': 'یک‌شنبه',
      'monday': 'دوشنبه',
      'tuesday': 'سه‌شنبه',
      'wednesday': 'چهارشنبه',
      'thursday': 'پنج‌شنبه',
      'friday': 'جمعه'
   };

   return englishToPersianMap[day] || 'Invalid Day of Week';
};