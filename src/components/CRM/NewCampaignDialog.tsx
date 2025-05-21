
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface NewCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddCampaign?: (campaign: any) => void;
}

export default function NewCampaignDialog({
  open,
  onOpenChange,
  onAddCampaign,
}: NewCampaignDialogProps) {
  const [name, setName] = useState("");
  const [target, setTarget] = useState("Todos os pacientes");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newCampaign = {
      id: Math.floor(Math.random() * 1000),
      name,
      target,
      message,
      date: date ? format(date, "dd/MM/yyyy") : "",
      status: "Ativo",
      sent: 0,
      opened: 0,
    };

    if (onAddCampaign) {
      onAddCampaign(newCampaign);
    }

    toast.success("Campanha criada com sucesso!");
    resetForm();
    onOpenChange(false);
  };

  const resetForm = () => {
    setName("");
    setTarget("Todos os pacientes");
    setMessage("");
    setDate(new Date());
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Nova Campanha</DialogTitle>
          <DialogDescription>
            Crie uma nova campanha de marketing para seus pacientes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Nome da Campanha</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Promoção de Clareamento"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="target">Público-alvo</Label>
              <Select value={target} onValueChange={setTarget}>
                <SelectTrigger id="target">
                  <SelectValue placeholder="Selecione o público" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Todos os pacientes">Todos os pacientes</SelectItem>
                  <SelectItem value="Pacientes +30 anos">Pacientes +30 anos</SelectItem>
                  <SelectItem value="Novos pacientes">Novos pacientes</SelectItem>
                  <SelectItem value="Pacientes sem consulta > 6 meses">
                    Pacientes sem consulta {'>'} 6 meses
                  </SelectItem>
                  <SelectItem value="Todos os contatos">Todos os contatos</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date">Data de Envio</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant={"outline"}
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !date && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {date ? format(date, "dd/MM/yyyy") : <span>Selecione uma data</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="message">Mensagem</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Digite a mensagem da campanha..."
                className="h-32 resize-none"
                required
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">Criar Campanha</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
