import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();

    if (!message) {
      throw new Error('Message is required');
    }

    console.log('Calling OpenAI API with message:', message);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('OPENAI_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an AI assistant that helps users understand the Indian Constitution. Provide accurate, concise answers about constitutional articles, amendments, fundamental rights, and related topics. If you are not sure about something, say so rather than making assumptions.'
          },
          {
            role: 'user',
            content: message
          }
        ],
      }),
    });

    const data = await response.json();
    console.log('OpenAI API response:', data);

    if (!response.ok) {
      const errorMessage = data.error?.message || 'Unknown error occurred';
      console.error('OpenAI API error:', errorMessage);
      return new Response(
        JSON.stringify({ 
          error: errorMessage.includes('quota') 
            ? 'The AI service is currently unavailable. Please try again later.'
            : `Error: ${errorMessage}`
        }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!data.choices?.[0]?.message?.content) {
      throw new Error('Invalid response format from OpenAI API');
    }

    const generatedText = data.choices[0].message.content;

    return new Response(JSON.stringify({ text: generatedText }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat function:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message || 'An unexpected error occurred'
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});