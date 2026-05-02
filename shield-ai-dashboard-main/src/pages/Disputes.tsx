import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Bot, Upload, FileText, CheckCircle, XCircle, Clock } from "lucide-react";
import { disputes, type Dispute } from "@/lib/mock-data";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function DisputeStatusBadge({ status }: { status: Dispute["status"] }) {
  const config = {
    won: { label: "Ganho", className: "bg-success/10 text-success border-success/20", icon: CheckCircle },
    lost: { label: "Perdido", className: "bg-destructive/10 text-destructive border-destructive/20", icon: XCircle },
    in_progress: { label: "Em Andamento", className: "bg-warning/10 text-warning border-warning/20", icon: Clock },
  };
  const c = config[status];
  return (
    <Badge variant="outline" className={`${c.className} gap-1`}>
      <c.icon className="h-3 w-3" />
      {c.label}
    </Badge>
  );
}

export default function Disputes() {
  return (
    <div className="space-y-6 animate-slide-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Disputas</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerencie chargebacks e gere defesas automaticamente</p>
        </div>
        <Button className="gap-2 glow-cyan">
          <Bot className="h-4 w-4" />
          Gerar Defesa com IA
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: "Disputas Ganhas", value: disputes.filter(d => d.status === "won").length, total: disputes.length, color: "text-success" },
          { label: "Em Andamento", value: disputes.filter(d => d.status === "in_progress").length, total: disputes.length, color: "text-warning" },
          { label: "Taxa de Sucesso", value: `${Math.round(disputes.filter(d => d.status === "won").length / disputes.length * 100)}%`, total: null, color: "text-primary" },
        ].map((s) => (
          <Card key={s.label} className="glass-card">
            <CardContent className="p-5">
              <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
              <p className={`text-2xl font-bold mt-1 ${s.color}`}>
                {s.value}{s.total !== null && <span className="text-sm text-muted-foreground font-normal">/{s.total}</span>}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table */}
      <Card className="glass-card">
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="border-border hover:bg-transparent">
                <TableHead className="text-muted-foreground">ID</TableHead>
                <TableHead className="text-muted-foreground">Transação</TableHead>
                <TableHead className="text-muted-foreground">Valor</TableHead>
                <TableHead className="text-muted-foreground">Motivo</TableHead>
                <TableHead className="text-muted-foreground">Status</TableHead>
                <TableHead className="text-muted-foreground">Data</TableHead>
                <TableHead className="text-muted-foreground">Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {disputes.map((d) => (
                <TableRow key={d.id} className="border-border hover:bg-muted/30 transition-colors">
                  <TableCell className="font-mono text-xs text-primary">{d.id}</TableCell>
                  <TableCell className="font-mono text-xs text-muted-foreground">{d.transactionId}</TableCell>
                  <TableCell className="font-medium">{formatCurrency(d.amount)}</TableCell>
                  <TableCell className="text-sm">{d.reason}</TableCell>
                  <TableCell><DisputeStatusBadge status={d.status} /></TableCell>
                  <TableCell className="text-xs text-muted-foreground">{d.date}</TableCell>
                  <TableCell>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <FileText className="h-3.5 w-3.5" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Upload className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Upload Zone */}
      <Card className="glass-card border-dashed border-2 border-primary/20 hover:border-primary/40 transition-colors">
        <CardContent className="p-8 text-center">
          <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
          <p className="text-sm font-medium">Arraste evidências aqui</p>
          <p className="text-xs text-muted-foreground mt-1">PDF, imagens ou documentos de comprovação</p>
          <Button variant="outline" size="sm" className="mt-4">
            Selecionar Arquivos
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
