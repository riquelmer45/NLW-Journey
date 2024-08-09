import { Link2, Plus } from "lucide-react";
import Button from "../../components/button";
import { useState, useEffect } from "react";
import { api } from "../../lib/axios";
import { useParams } from "react-router-dom";
import CreateLinkModal from "./create-link-modal";

interface Links {
  id: string;
  title: string;
  url: string;
}

export default function ImportantLinks() {
  const { tripId } = useParams();
  const [links, setLinks] = useState<Links[]>([]);
  const [isCreateLinkModalOpen, setIsCreateLinkModalOpen] = useState(false);

  function openCreateLinkModal() {
    setIsCreateLinkModalOpen(true);
  }

  function closeCreateLinkModal() {
    setIsCreateLinkModalOpen(false);
  }

  useEffect(() => {
    api
      .get(`/trips/${tripId}/links`)
      .then((response) => setLinks(response.data.links));
  }, [tripId]);

  return (
    <main>
      <div className="space-y-6">
        <h2 className="text-xl font-semibold">Links importantes</h2>
        <div className="space-y-5">
          {links.map((link) => {
            return (
              <div key={link.id} className="flex items-center justify-between">
                <div className="space-y-1.5">
                  <span className="block font-medium text-zinc-100">
                    {link.title}
                  </span>
                  <a
                    href="#"
                    className="block text-xs text-zinc-400 truncate hover:text-zinc-200"
                  >
                    {link.url}
                  </a>
                </div>
                <Link2 className="size-5 text-zinc-400 shrink-0" />
              </div>
            );
          })}
        </div>
        <Button onClick={openCreateLinkModal} variant="secondary" size="full">
          <Plus className="size-5" />
          Cadastrar novo link
        </Button>
      </div>
      {isCreateLinkModalOpen && (
        <CreateLinkModal closeCreateLinkModal={closeCreateLinkModal} />
      )}
    </main>
  );
}
