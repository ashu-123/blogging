package com.server.blog.resource;

import org.springframework.ai.chat.client.ChatClient;
import org.springframework.ai.chat.model.ChatResponse;
import org.springframework.ai.ollama.OllamaChatModel;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ollama")
@CrossOrigin("*")
public class BlogPostAiResource {

    private ChatClient chatClient;

    public BlogPostAiResource(OllamaChatModel chatModel){
        this.chatClient = ChatClient.create(chatModel);
    }

    @GetMapping("/{message}")
    public ResponseEntity<String[]> getAnswer(@PathVariable String message){

        String input = """
                Give me 3 better alternatives for the following blog post name in a numbered list fashion.
                Do not return anything else except for a list of 3 blog name suggestions. The blog post name is : 
                """ + message;
        ChatResponse chatResponse = chatClient
                .prompt(input)
                .call()
                .chatResponse();

        System.out.println(chatResponse.getMetadata().getModel());

        String response = chatResponse.getResult().getOutput().getText();
        String[] res = response.split("\\n");
        System.out.println(res);
        return ResponseEntity.ok(res);
    }

}
