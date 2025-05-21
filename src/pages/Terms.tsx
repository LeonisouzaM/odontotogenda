
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Terms() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/" className="text-odonto-blue hover:underline flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Termos de Serviço</h1>
        
        <div className="prose prose-blue max-w-none">
          <h2>1. Aceitação dos Termos</h2>
          <p>
            Ao acessar e utilizar o OdontoAgenda, você concorda em cumprir e estar vinculado aos seguintes Termos de Serviço. 
            Se você não concordar com qualquer parte destes termos, não poderá utilizar nossos serviços.
          </p>
          
          <h2>2. Descrição do Serviço</h2>
          <p>
            O OdontoAgenda é uma plataforma de gerenciamento para clínicas odontológicas que oferece funcionalidades de agendamento, 
            gerenciamento de pacientes, prontuários eletrônicos, controle financeiro e ferramentas de marketing.
          </p>
          
          <h2>3. Conta de Usuário</h2>
          <p>
            Para utilizar os serviços do OdontoAgenda, você precisa criar uma conta. Você é responsável por manter a confidencialidade 
            de suas credenciais de login e por todas as atividades que ocorrem em sua conta.
          </p>
          
          <h2>4. Uso Aceitável</h2>
          <p>
            Você concorda em utilizar o OdontoAgenda apenas para fins legítimos e de acordo com as leis aplicáveis. 
            Você não deve usar nossos serviços para qualquer atividade ilegal ou não autorizada.
          </p>
          
          <h2>5. Privacidade e Dados</h2>
          <p>
            O uso dos dados é regido por nossa Política de Privacidade, que pode ser encontrada em nossa plataforma.
          </p>
          
          <h2>6. Alterações nos Termos</h2>
          <p>
            Reservamo-nos o direito de modificar estes termos a qualquer momento. As alterações entrarão em vigor imediatamente após a publicação. 
            O uso contínuo do serviço após tais alterações constitui sua aceitação dos novos termos.
          </p>
          
          <h2>7. Limitação de Responsabilidade</h2>
          <p>
            O OdontoAgenda não será responsável por quaisquer danos diretos, indiretos, incidentais, especiais ou consequentes resultantes 
            do uso ou da incapacidade de usar nossos serviços.
          </p>
          
          <h2>8. Lei Aplicável</h2>
          <p>
            Estes Termos de Serviço serão regidos e interpretados de acordo com as leis do Brasil, independentemente de seus conflitos de princípios legais.
          </p>
        </div>
      </div>
    </div>
  );
}
