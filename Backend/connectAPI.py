import requests

API_KEY = "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"

def genarate_response(context, user_question):

    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json"
    }

    data = {
        "model": "mistralai/mistral-7b-instruct:free",
        "messages": [
            {"role": "system", "content": "You are a helpful legal assistant. Answer questions based only on the given context."},
            {"role": "user", "content": f"Context:\n{context}\n\nQuestion: {user_question}"}
        ]
    }

    response = requests.post("https://openrouter.ai/api/v1/chat/completions", headers=headers, json=data)

    return(response.json()["choices"][0]["message"]["content"])