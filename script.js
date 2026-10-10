// Dicionário de respostas simuladas baseadas nas personas/instruções
const mockResponses = {
    pirate: {
        text: "Ahoy matey! Semicolons be mostly optional in JavaScript, by the powers of Automatic Semicolon Insertion! But beware the hidden reefs, or yer code might walk the plank!",
        id: "msg_pirate_7ba4819183a15cc17d011509"
    },
    default: {
        text: "Yes, semicolons are mostly optional in JavaScript due to Automatic Semicolon Insertion (ASI). However, it is a best practice to use them to avoid unexpected bugs in specific edge cases.",
        id: "msg_default_67b73f697ba4819183a1"
    }
};

document.getElementById('btn-generate').addEventListener('click', () => {
    const model = document.getElementById('model-select').value;
    const effort = document.getElementById('reasoning-effort').value;
    const instructions = document.getElementById('developer-instructions').value.toLowerCase();
    const userInput = document.getElementById('user-input').value;

    const outputContainer = document.getElementById('output-text-container');
    const jsonContainer = document.getElementById('json-output');

    // Validação simples de entrada
    if (!userInput.trim()) {
        outputContainer.classList.add('placeholder');
        outputContainer.innerText = "Por favor, insira uma mensagem do usuário.";
        return;
    }

    outputContainer.classList.remove('placeholder');
    outputContainer.innerText = "Processando resposta (Simulando Responses API)...";

    // Simula o delay da Responses API
    setTimeout(() => {
        // Escolhe a resposta simulada baseada nas instruções do desenvolvedor
        let chosenResponse = mockResponses.default;
        if (instructions.includes('pirate') || instructions.includes('pirata')) {
            chosenResponse = mockResponses.pirate;
        } else if (userInput.toLowerCase().includes('unicorn')) {
            chosenResponse = {
                text: "Under the soft glow of the moon, Luna the unicorn danced through fields of twinkling stardust, leaving trails of dreams for every child asleep.",
                id: "msg_67b73f697ba4819183a15cc17d011509"
            };
        }

        // Atualiza a interface gráfica com o output_text agrupado
        outputContainer.innerText = chosenResponse.text;

        // Monta o objeto JSON completo conforme o padrão especificado no documento
        const fullJsonResponse = {
            id: chosenResponse.id,
            object: "model.response",
            model: model,
            reasoning: {
                effort: effort
            },
            output: [
                {
                    id: chosenResponse.id,
                    type: "message",
                    role: "assistant",
                    content: [
                        {
                            type: "output_text",
                            text: chosenResponse.text,
                            annotations: []
                        }
                    ]
                }
            ],
            output_text: chosenResponse.text
        };

        // Renderiza o JSON formatado
        jsonContainer.innerText = JSON.stringify(fullJsonResponse, null, 2);
    }, 1200);
});
