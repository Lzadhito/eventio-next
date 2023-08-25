import * as yup from 'yup';

export const eventSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().optional(),
  banner: yup.mixed().optional().nullable(),
  startDate: yup.date().required(),
  endDate: yup
    .date()
    .required()
    .test('end_greater_start_date_test', 'End date must be greater than start date', function (value) {
      const { startDate } = this.parent;
      return value.getTime() > startDate.getTime();
    }),
});

export const seriesSchema = yup.object({
  name: yup.string().required(),
  description: yup.string().required(),
  events: yup.array(eventSchema).optional(),
});
