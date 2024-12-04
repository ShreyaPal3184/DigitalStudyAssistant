const { AzureKeyCredential, TextAnalysisClient } = require("@azure/ai-language-text");
require("dotenv").config();

const endpoint = process.env.AZURE_LANGUAGE_ENDPOINT;
const key = process.env.AZURE_KEY;


const summarizeText = async (req, res) => {
  const { text, maxSentenceCount } = req.body;

  if (!text || typeof text !== "string") {
    return res.status(400).json({ error: "Invalid 'text' field. It must be a non-empty string." });
  }

  try {
    const documents = [text];
    const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(key));
    const actions = [
      {
        kind: "ExtractiveSummarization",
        maxSentenceCount: maxSentenceCount || 3, // Default to 3 sentences
      },
    ];
    const poller = await client.beginAnalyzeBatch(actions, documents, "en");
    poller.onProgress(() => {
      console.log(
        `Last time the operation was updated was on: ${poller.getOperationState().modifiedOn}`
      );
    });
    console.log(`The operation was created on ${poller.getOperationState().createdOn}`);
    console.log(`The operation results will expire on ${poller.getOperationState().expiresOn}`);

    const results = await poller.pollUntilDone();

    console.log("Results:", results);

    for await (const actionResult of results) {
      if (actionResult.kind !== "ExtractiveSummarization") {
        throw new Error(`Expected extractive summarization results but got: ${actionResult.kind}`);
      }
      if (actionResult.error) {
        const { code, message } = actionResult.error;
        throw new Error(`Unexpected error (${code}): ${message}`);
      }
      for (const result of actionResult.results) {
        console.log(`- Document ${result.id}`);
        if (result.error) {
          const { code, message } = result.error;
          throw new Error(`Unexpected error (${code}): ${message}`);
        }

        res.send(result.sentences.map((sentence) => sentence.text).join("\n"));
        console.log("Summary:");
        console.log(result.sentences.map((sentence) => sentence.text).join("\n"));
      }
    }

  } catch (err) {
    console.error("Error processing the summarization request:", err);
    return res.status(500).json({ error: err.message });
  }

};


module.exports = { summarizeText };