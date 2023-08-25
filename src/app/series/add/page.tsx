'use client';
import { yupResolver } from '@hookform/resolvers/yup';
import clsx from 'clsx';
import { useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import Icon from '@/app/components/Icon';
import Controller from '@/app/components/ui/Controller';
import Navbar from '@/app/components/ui/Navbar';
import EventModal from '@/app/series/components/EventModal';
import { seriesSchema } from '@/schemas/eventSeries';
import { Event } from '@/types/event';
import { Series } from '@/types/series';

import { DEFAULT_SERIES_VALUES } from './constants';
import EventRow from './EventRow';

export default function AddSeriesPage() {
  const [selectedEvent, setSelectedEvent] = useState<Event>();
  const [showEventModal, setShowEventModal] = useState(false);
  const { control, handleSubmit: rhfHandleSubmit } = useForm({
    resolver: yupResolver(seriesSchema),
    defaultValues: DEFAULT_SERIES_VALUES,
  });
  const { fields: events, append, update } = useFieldArray({ control, name: 'events' });

  function handleSaveSeries(data: Series) {
    console.log(data);
  }

  function handleSubmitEvent(data: any) {
    if (selectedEvent) {
      //Edit
      const eventIdx = events.findIndex((ev) => ev.id === data.id);
      update(eventIdx, data);
      setSelectedEvent(undefined);
    } else {
      // Add
      append(data);
    }
  }

  function handleClickEvent(event: Event) {
    setSelectedEvent(event);
    setShowEventModal(true);
  }

  const sortedEvents = events ? [...events].sort((a, b) => a.startDate - b.startDate) : [];
  const isEventExist = Array.isArray(events) && events.length > 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow p-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-8">Create an Event Series</h1>
        <form className="flex flex-col gap-4" onSubmit={rhfHandleSubmit(handleSaveSeries)}>
          <Controller control={control} name="name" label="Series Name">
            <input type="text" placeholder="Input series name" className="input input-bordered" />
          </Controller>

          <Controller control={control} name="description" label="Series Description">
            <textarea
              placeholder="Input series description"
              className="textarea textarea-bordered w-full max-w-4xl min-h-[8rem]"
            />
          </Controller>

          <div
            className={clsx({
              'space-y-4': isEventExist,
            })}
          >
            <label className="label">
              <span className="label-text">Series of Events</span>
            </label>

            <ul
              className={clsx({
                'space-y-4': true,
                hidden: !isEventExist,
              })}
            >
              {sortedEvents.map((event) => (
                <EventRow key={event.name} event={event as Event} onClick={handleClickEvent} />
              ))}
            </ul>

            <button type="button" className="btn btn-secondary normal-case" onClick={() => setShowEventModal(true)}>
              <Icon icon="plus" />
              <span>New Series</span>
            </button>
          </div>

          <div className="grow min-h-16" />

          <button type="submit" className="btn btn-primary float-right self-end w-fit">
            Save Series
          </button>
        </form>
      </main>
      {showEventModal && (
        <EventModal
          visible={showEventModal}
          onClose={() => {
            setShowEventModal(false);
            setSelectedEvent(undefined);
          }}
          data={selectedEvent}
          onSubmit={handleSubmitEvent}
        />
      )}
    </div>
  );
}
