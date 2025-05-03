from retreve import retrieve_relevant_documents
from connectAPI import genarate_response

def generate_answer(qusetion):

    docs = retrieve_relevant_documents(qusetion)

    context = "\n\n".join([doc[2] for doc in docs])

    answer = genarate_response(context, qusetion)

    return answer
