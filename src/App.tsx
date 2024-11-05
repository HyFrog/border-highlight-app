import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HoverHighlight from './HoverHighlight.tsx';

interface Data {
    [key: string]: Array<{
        lastUpdatedBy: string;
        folders: any[];
        previewUrl: string;
        data: {
            jsCode: string;
            httpRequests: Record<string, any>;
            settings: Array<{
                type: string;
                content?: string;
                default?: string;
                options?: Array<{
                    label: string;
                    value: string;
                }>;
                id?: string;
            }>;
        };
        blocks: Array<{
            id: string;
            type: string;
            content: string;
            settings: Array<{
                id: string;
                type: string;
                label: string;
                default?: string;
                options?: Array<{
                    label: string;
                    value: string;
                }>;
            }>;
            bindings?: Record<string, any>;
            bindingActions?: Record<string, any>;
        }>;
    }>;
}

interface ProcessedData {
    [key: string]: boolean;
}

function App() {
  const [data, setData] = useState<Data | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedData>({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://cdn.builder.io/api/v3/query/3628f640692a4d2fa236d814bb277285/8c22b490d74c4be8840ebf9c8add7012?omit=meta.componentsUsed&apiKey=3628f640692a4d2fa236d814bb277285&userAttributes.urlPath=%2Fapi%2Finternal-preview-cart&userAttributes.host=upez-frontend.vercel.app&userAttributes.device=desktop&options.8c22b490d74c4be8840ebf9c8add7012.prerender=false&options.8c22b490d74c4be8840ebf9c8add7012.model=%22page%22&options.8c22b490d74c4be8840ebf9c8add7012.entry=%228c22b490d74c4be8840ebf9c8add7012%22');
        const fetchedData: Data = response.data;
        setData(fetchedData);

        const status: ProcessedData = {};

        Object.values(fetchedData).forEach(contents => {
          contents.forEach(content => {
            content.blocks.forEach(block => {
              const hasSettingsInBindings = block.bindings && Object.keys(block.bindings).some(key => key in content.data.settings);
              const hasSettingsInBindingActions = block.bindingActions && Object.keys(block.bindingActions).some(key => key in content.data.settings);

              if (hasSettingsInBindings || hasSettingsInBindingActions) {
                status[block.id] = true;
              }
            });
          });
        });

        setProcessedData(status);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Hover Highlight Test</h1>
        <HoverHighlight data={processedData} />
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </header>
    </div>
  );
}

export default App;