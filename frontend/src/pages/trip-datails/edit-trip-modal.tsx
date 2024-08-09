import { useState } from "react";
import { Calendar, MapPin, X } from "lucide-react";
import { DateRange, DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { api } from "../../lib/axios";
import Button from "../../components/button";

interface EditTripModalProps {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  closeEditTripModal: () => void;
}

function EditTripModal({
  id,
  destination: initialDestination,
  starts_at,
  ends_at,
  closeEditTripModal,
}: EditTripModalProps) {
  const [destination, setDestination] = useState(initialDestination);
  const [dateRange, setDateRange] = useState<DateRange | undefined>({
    from: new Date(starts_at),
    to: new Date(ends_at),
  });

  const handleSave = async () => {
    const updatedTrip = {
      id,
      destination,
      starts_at: dateRange?.from?.toISOString() || starts_at,
      ends_at: dateRange?.to?.toISOString() || ends_at,
    };

    await api.put(`/trips/${id}`, updatedTrip);

    window.document.location.reload();
  };

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center">
      <div className="w-82 rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Editar Viagem</h2>
            <button onClick={closeEditTripModal} type="button">
              <X className="size-5 text-zinc-400" />
            </button>
          </div>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <MapPin className="size-5 text-zinc-400 mr-5" />
              <input
                className="bg-transparent text-lg placeholder-zinc-400 outline-none flex-1"
                type="text"
                value={destination}
                onChange={(event) => setDestination(event.target.value)}
                placeholder="Para onde você vai?"
              />
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="size-5 text-zinc-400" />
              <DayPicker
                mode="range"
                selected={dateRange}
                onSelect={setDateRange}
                classNames={{
                  months:
                    "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
                  month: "space-y-4",
                  caption: "flex justify-center pt-1 relative items-center",
                  caption_label: "text-sm font-medium",
                  nav: "space-x-1 flex items-center",
                  nav_button:
                    "h-7 w-7 hover:opacity-100 shadow-sm hover:bg-accent hover:text-accent-foreground flex justify-center items-center rounded-md",
                  nav_button_previous: "absolute left-1",
                  nav_button_next: "absolute right-1",
                  head_row: "flex",
                  head_cell: "w-8 font-normal text-[0.8rem]",
                  row: "flex w-full mt-2",
                  cell: "p-0",
                  day: "h-8 w-8 p-0 ease-in-out hover:rounded-md aria-selected:bg-lime-300 aria-selected:text-lime-950 aria-selected:hover:rounded-none",
                  day_range_start:
                    "day-range-start rounded-l-md aria-selected:hover:rounded-l-md aria-selected:hover:bg-lime-500",
                  day_range_end:
                    "day-range-end rounded-r-md aria-selected:hover:rounded-r-md aria-selected:hover:bg-lime-500",
                  day_today:
                    "text-accent-foreground bg-zinc-950/95 rounded-md aria-selected:rounded-r-none",
                  day_outside:
                    "day-outside text-muted-foreground opacity-50 aria-selected:opacity-100 aria-selected:bg-lime-300 aria-selected:text-lime-950",
                  day_disabled: "text-muted-foreground opacity-50",
                  day_range_middle:
                    "aria-selected:bg-lime-300/90 rounded-none aria-selected:hover:bg-lime-500",
                }}
              />
            </div>
          </div>
        </div>
        <Button variant="primary" onClick={handleSave} className="size-5">
          Atualizar viagem
        </Button>
      </div>
    </div>
  );
}

export default EditTripModal;
