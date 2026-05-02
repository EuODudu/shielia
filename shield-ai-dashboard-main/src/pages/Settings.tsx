import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Eye, EyeOff, Copy, RefreshCw, Plug, Key, ShieldCheck, Bell } from "lucide-react";

const integrations = [
  { name: "Stripe", description: "Gateway de pagamento internacional", connected: true, logo: "S" },
  { name: "Mercado Pago", description: "Pagamentos na América Latina", connected: true, logo: "MP" },
  { name: "PagSeguro", description: "Gateway brasileiro", connected: false, logo: "PS" },
  { name: "Cielo", description: "Adquirente e gateway", connected: false, logo: "CI" },
];

export default function SettingsPage() {
  const [showKey, setShowKey] = useState(false);
  const [riskThreshold, setRiskThreshold] = useState([70]);
  const [rules, setRules] = useState({
    autoBlock: true,
    velocityCheck: true,
    geoBlocking: false,
    deviceFingerprint: true,
  });

  const apiKey = "csk_live_4f8a2b1c9d3e7f6a0b5c8d2e";

  return (
    <div className="space-y-6 animate-slide-in">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
        <p className="text-muted-foreground text-sm mt-1">Integrações, API e regras antifraude</p>
      </div>

      {/* Integrations */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <Plug className="h-4 w-4" /> Integrações
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {integrations.map((int) => (
            <Card key={int.name} className="glass-card hover:border-primary/30 transition-all">
              <CardContent className="p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-xs font-bold text-primary">
                    {int.logo}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{int.name}</p>
                    <p className="text-xs text-muted-foreground">{int.description}</p>
                  </div>
                </div>
                <Button variant={int.connected ? "outline" : "default"} size="sm">
                  {int.connected ? "Conectado" : "Conectar"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* API Keys */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <Key className="h-4 w-4" /> API Keys
        </h2>
        <Card className="glass-card">
          <CardContent className="p-5 space-y-4">
            <div>
              <Label className="text-xs text-muted-foreground">Chave de Produção</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  readOnly
                  type={showKey ? "text" : "password"}
                  value={apiKey}
                  className="font-mono text-xs bg-muted/50"
                />
                <Button variant="ghost" size="icon" onClick={() => setShowKey(!showKey)}>
                  {showKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
                <Button variant="ghost" size="icon">
                  <Copy className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Anti-fraud Rules */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <ShieldCheck className="h-4 w-4" /> Regras Antifraude
        </h2>
        <Card className="glass-card">
          <CardContent className="p-5 space-y-6">
            <div className="space-y-4">
              {[
                { key: "autoBlock" as const, label: "Bloqueio automático", desc: "Bloquear transações com score acima do limite" },
                { key: "velocityCheck" as const, label: "Verificação de velocidade", desc: "Detectar múltiplas transações em curto período" },
                { key: "geoBlocking" as const, label: "Bloqueio geográfico", desc: "Restringir transações de regiões suspeitas" },
                { key: "deviceFingerprint" as const, label: "Fingerprint de dispositivo", desc: "Rastrear e validar dispositivos" },
              ].map((rule) => (
                <div key={rule.key} className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium">{rule.label}</p>
                    <p className="text-xs text-muted-foreground">{rule.desc}</p>
                  </div>
                  <Switch
                    checked={rules[rule.key]}
                    onCheckedChange={(v) => setRules({ ...rules, [rule.key]: v })}
                  />
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-border">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Limite de risco para bloqueio</Label>
                <span className="text-sm font-mono font-bold text-primary">{riskThreshold[0]}</span>
              </div>
              <Slider
                value={riskThreshold}
                onValueChange={setRiskThreshold}
                max={100}
                min={10}
                step={5}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                Transações com score acima de {riskThreshold[0]} serão bloqueadas automaticamente
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications */}
      <div>
        <h2 className="text-sm font-medium text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
          <Bell className="h-4 w-4" /> Notificações
        </h2>
        <Card className="glass-card">
          <CardContent className="p-5 space-y-4">
            {[
              { label: "Alertas de fraude em tempo real", enabled: true },
              { label: "Relatório diário por e-mail", enabled: true },
              { label: "Novos chargebacks", enabled: true },
              { label: "Atualizações de disputas", enabled: false },
            ].map((n) => (
              <div key={n.label} className="flex items-center justify-between">
                <span className="text-sm">{n.label}</span>
                <Switch defaultChecked={n.enabled} />
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
