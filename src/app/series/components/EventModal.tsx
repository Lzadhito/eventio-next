import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import { ChangeEvent, useEffect } from 'react';
import { useForm, useWatch } from 'react-hook-form';

import Modal from '@/app/components/Modal';
import Controller from '@/app/components/ui/Controller';
import { eventSchema } from '@/schemas/eventSeries';
import { RHFOnChange } from '@/types';
import type { Event } from '@/types/event';

import { DEFAULT_EVENT_VALUES } from '../constants';

interface Props {
  visible: boolean;
  data?: Event;
  onSubmit: (data: any) => void;
  onClose: () => void;
}

export default function EventModal({ visible, onClose, data, onSubmit }: Props) {
  const { control, handleSubmit, reset, resetField } = useForm<Event>({
    resolver: yupResolver(eventSchema),
    defaultValues: DEFAULT_EVENT_VALUES,
  });

  // Use data on Edit
  useEffect(() => {
    if (data) reset(data);
  }, [data, reset]);

  function handleSaveEvent(data: any) {
    onSubmit(data);
    onClose();
  }

  function handleChangeBanner(e: ChangeEvent<HTMLInputElement>, rhfOnChange: RHFOnChange) {
    rhfOnChange(e.target.files[0]);
  }

  function generateDate(date: Date | string) {
    if (date instanceof Date) return date.toISOString().substring(0, 16);
    else return date;
  }

  const banner = useWatch({ control, name: 'banner', defaultValue: data?.banner });
  return (
    <Modal visible={visible} onClose={onClose}>
      <h3 className="font-bold text-xl sm:text-2xl">{data ? 'Edit' : 'Add'} Event</h3>
      <form className="mt-4 grid gap-4" method="dialog" onSubmit={handleSubmit(handleSaveEvent)}>
        <Controller name="name" control={control} label="Event Name">
          <input type="text" placeholder="Input series name" className="input input-bordered" />
        </Controller>

        <Controller name="description" control={control} label="Event Description" secondaryLabel="optional">
          <textarea
            placeholder="Input series description"
            className="textarea textarea-bordered w-full max-w-4xl min-h-[8rem]"
          />
        </Controller>

        {banner && (
          <Image
            height="100"
            unoptimized
            alt="banner-preview"
            src={URL.createObjectURL(banner as Blob)}
            width="500"
            className="contain"
          />
        )}
        <Controller
          valuePropName="files"
          name="banner"
          secondaryLabel="optional"
          control={control}
          label="Event Banner"
          onChange={handleChangeBanner}
        >
          <input
            accept="image/*"
            type="file"
            className="input w-72 sm:w-auto file-input file-input-bordered file:!btn"
          />
        </Controller>

        <div>
          <label className="label pb-0">
            <span className="label-text leading-none">Event Date</span>
          </label>

          <div className="grid sm:grid-cols-2 gap-4">
            <Controller generateValue={generateDate} control={control} name="startDate" label={<sub>Start Date</sub>}>
              <input type="datetime-local" className="input w-full input-bordered" />
            </Controller>

            <Controller generateValue={generateDate} control={control} name="endDate" label={<sub>End Date</sub>}>
              <input type="datetime-local" className="input w-full input-bordered" />
            </Controller>
          </div>
        </div>
        <div className="modal-action">
          <button className="btn btn-primary" type="submit">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  );
}
