
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/" className="text-odonto-blue hover:underline flex items-center">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar para a página inicial
          </Link>
        </div>
        
        <h1 className="text-3xl font-bold mb-6">Política de Privacidade</h1>
        
        <div className="prose prose-blue max-w-none">
          <h2>1. Informações que Coletamos</h2>
          <p>
            O OdontoAgenda coleta informações pessoais como nome, e-mail, telefone e informações profissionais necessárias para a prestação 
            de nossos serviços. Além disso, coletamos informações sobre pacientes inseridas por nossos usuários.
          </p>
          
          <h2>2. Como Utilizamos suas Informações</h2>
          <p>
            Utilizamos as informações coletadas para:
          </p>
          <ul>
            <li>Fornecer, manter e melhorar nossos serviços</li>
            <li>Processar transações e enviar notificações relacionadas</li>
            <li>Responder a comentários e perguntas</li>
            <li>Enviar informações sobre atualizações e ofertas</li>
            <li>Proteger nossos serviços e usuários</li>
          </ul>
          
          <h2>3. Compartilhamento de Informações</h2>
          <p>
            Não vendemos, comercializamos ou transferimos suas informações pessoais para terceiros, exceto para prestadores de serviços que nos auxiliam na 
            operação do site e na condução de nossos negócios, desde que concordem em manter essas informações confidenciais.
          </p>
          
          <h2>4. Segurança de Dados</h2>
          <p>
            Implementamos medidas de segurança técnicas e organizacionais para proteger suas informações pessoais contra acesso não autorizado, 
            alteração, divulgação ou destruição.
          </p>
          
          <h2>5. Seus Direitos</h2>
          <p>
            Você tem o direito de acessar, corrigir, excluir ou limitar o processamento de suas informações pessoais. Para exercer esses direitos, 
            entre em contato conosco através dos canais disponíveis em nossa plataforma.
          </p>
          
          <h2>6. Cookies e Tecnologias Similares</h2>
          <p>
            Utilizamos cookies e tecnologias similares para melhorar sua experiência em nosso site, entender como você interage com nossos serviços 
            e para personalizar e melhorar sua experiência.
          </p>
          
          <h2>7. Alterações nesta Política</h2>
          <p>
            Podemos atualizar nossa Política de Privacidade periodicamente. Notificaremos sobre quaisquer alterações publicando a nova Política de Privacidade 
            nesta página e, se as alterações forem significativas, enviaremos um aviso por e-mail.
          </p>
          
          <h2>8. Contato</h2>
          <p>
            Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco através do e-mail: privacidade@odontoagenda.com.br
          </p>
        </div>
      </div>
    </div>
  );
}
