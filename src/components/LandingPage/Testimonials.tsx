
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Dra. Ana Paula Silva",
    role: "Dentista autônoma",
    image: "",
    content: "O OdontoGenda revolucionou meu consultório. Economizo pelo menos 5 horas por semana em tarefas administrativas e os pacientes adoram a facilidade para agendar consultas.",
    stars: 5
  },
  {
    name: "Dr. Marcos Oliveira",
    role: "Proprietário de clínica",
    image: "",
    content: "Desde que implementamos o OdontoGenda, reduzimos o número de faltas em 40% e melhoramos o fluxo financeiro. A equipe se adaptou rapidamente e os pacientes elogiam constantemente.",
    stars: 5
  },
  {
    name: "Grupo Sorriso Perfeito",
    role: "Rede com 5 unidades",
    image: "",
    content: "Com o módulo de gestão de rede, conseguimos padronizar os processos e acompanhar o desempenho de cada unidade. O suporte é excelente e as atualizações constantes trazem sempre novidades úteis.",
    stars: 4
  }
];

export default function Testimonials() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="odonto-container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 font-poppins">
            O Que Dizem Nossos Clientes Satisfeitos:
          </h2>
          <p className="text-lg text-gray-600 font-inter">
            Profissionais e clínicas de todo o país já transformaram sua gestão com o OdontoGenda.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-8 border border-gray-100 transition-all hover:shadow-lg">
              <div className="flex items-center gap-1 text-yellow-400 mb-4">
                {[...Array(testimonial.stars)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
                {[...Array(5 - testimonial.stars)].map((_, i) => (
                  <Star key={i + testimonial.stars} className="h-5 w-5 text-gray-300" />
                ))}
              </div>
              <p className="text-gray-600 mb-6 font-inter">"{testimonial.content}"</p>
              <div className="flex items-center">
                <Avatar className="h-10 w-10 mr-3">
                  <AvatarImage src={testimonial.image} />
                  <AvatarFallback className="bg-blue-600 text-white">
                    {testimonial.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold font-poppins">{testimonial.name}</p>
                  <p className="text-sm text-gray-500 font-inter">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
