import { NextResponse } from 'next/server';
import axios from 'axios';

interface WolframSubpod {
  plaintext: string;
}

interface WolframPod {
  title: string;
  subpods: WolframSubpod[];
}

export async function GET(request: Request) {
  // Get parameters from URL
  const url = new URL(request.url);
  const query = url.searchParams.get('query');
  
  if (!query) {
    return NextResponse.json(
      { error: 'Query parameter is required' },
      { status: 400 }
    );
  }
  
  // API anahtarını Vercel'deki gizli (secret) değişkenden al
  const WOLFRAM_APP_ID = process.env.NEXT_SECRET_WOLFRAM_APP_ID || '';
  
  // API key check
  if (!WOLFRAM_APP_ID) {
    console.error('WolframAlpha API key is not set');
    return NextResponse.json(
      { 
        success: false, 
        steps: ['WolframAlpha API key is not configured. Please contact the administrator.']
      },
      { status: 500 }
    );
  }
  
  try {
    // Send request to WolframAlpha API
    const response = await axios.get(`https://api.wolframalpha.com/v2/query`, {
      params: {
        input: query,
        format: 'plaintext',
        output: 'JSON',
        appid: WOLFRAM_APP_ID
      }
    });
    
    const data = response.data;
    
    // Process data from API
    if (data.queryresult && data.queryresult.success) {
      const pods = data.queryresult.pods as WolframPod[];
      const steps: string[] = [];
      
      // Add title and problem definition
      steps.push(`Problem: ${query}`);
      
      // Add all results as steps
      pods.forEach((pod: WolframPod) => {
        if (pod.title && pod.subpods && pod.subpods.length > 0) {
          steps.push(`${pod.title}:`);
          
          pod.subpods.forEach((subpod: WolframSubpod) => {
            if (subpod.plaintext) {
              // Clean and format steps
              const lines = subpod.plaintext.split('\n').filter((line: string) => line.trim() !== '');
              lines.forEach((line: string) => {
                steps.push(line);
              });
            }
          });
        }
      });
      
      return NextResponse.json({ success: true, steps });
    } else {
      return NextResponse.json({ 
        success: false, 
        steps: ['Wolfram Alpha could not solve this problem. Please try again with a different format.'] 
      });
    }
  } catch (error) {
    console.error('WolframAlpha API error:', error);
    
    // More descriptive error message
    let errorMessage = 'An error occurred while calculating with the API.';
    
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        errorMessage = 'Could not connect to WolframAlpha API server. Please check your internet connection.';
      } else if (error.response) {
        errorMessage = `WolframAlpha API response error: ${error.response.status} ${error.response.statusText}`;
      } else if (error.request) {
        errorMessage = 'WolframAlpha API did not respond. Please check your internet connection.';
      }
    }
    
    return NextResponse.json(
      { success: false, steps: [errorMessage] },
      { status: 500 }
    );
  }
} 