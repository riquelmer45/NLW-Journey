import { MapPin, Calendar, Settings2Icon } from "lucide-react";
import Button from "../../components/button";
import EditTripModal from "./edit-trip-modal";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../../lib/axios";
import { format } from "date-fns";

interface Trip {
  id: string;
  destination: string;
  starts_at: string;
  ends_at: string;
  is_confirmed: boolean;
}

export default function DestinationAndDateHeader() {
  const { tripId } = useParams();
  const [trip, setTrip] = useState<Trip | undefined>();
  const [editModalOpen, setEditModalOpen] = useState(false); 

  useEffect(() => {
    api.get(`/trips/${tripId}`).then((response) => setTrip(response.data.trip));
  }, [tripId]);

  const displayDate = trip
    ? format(new Date(trip.starts_at), "d' de 'LLL")
        .concat(" até ")
        .concat(format(new Date(trip.ends_at), "d' de 'LLL"))
    : null;

  function openEditTripModal() {
    setEditModalOpen(true);
  }

  function closeEditTripModal() {
    setEditModalOpen(false);
  }

  return (
    <div className="px-4 h-16 rounded-xl bg-zinc-900 shadow-shape flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin className="size-5 text-zinc-400" />
        <span className=" text-zinc-100">{trip?.destination}</span>
      </div>

      <div className="flex items-center gap-5">
        <div className="flex items-center gap-2">
          <Calendar className="size-5 text-zinc-400" />
          <span className=" text-zinc-100">{displayDate}</span>
        </div>

        <div className="w-px h6 bg-zinc-400"></div>

        <Button variant="secondary" onClick={openEditTripModal}>
          Alterar local/data
          <Settings2Icon className="size-5" />
        </Button>
      </div>

      {editModalOpen && trip && (
        <EditTripModal
          id={trip.id}
          destination={trip.destination}
          starts_at={trip.starts_at}
          ends_at={trip.ends_at}
          closeEditTripModal={closeEditTripModal}
        />
      )}
    </div>
  );
}