# Prompt Optimizer

A web application that optimizes user prompts for different Large Language Models (LLM) including GPT, Claude, and Gemini. The optimizer restructures prompts according to each model's best practices while preserving the original intent.

## Features

- **Multi-LLM Support**: Optimize prompts for GPT, Claude, and Gemini
- **Intelligent Optimization**: Restructures prompts using model-specific best practices
- **Intent Preservation**: Maintains the exact action requested by the user
- **Professional UI**: Clean, minimal interface for optimal user experience
- **Real-time Processing**: Fast prompt optimization with loading feedback
- **Copy to Clipboard**: Easy copying of optimized prompts

## Tech Stack

### Backend
- **Framework**: FastAPI (Python)
- **LLM Integration**: OpenAI API
- **Environment**: Python 3.12+
- **Package Manager**: pip

### Frontend
- **HTML5**: Semantic markup
- **CSS3**: Professional styling
- **JavaScript**: Vanilla JS for API integration

### Additional Libraries
- `python-dotenv`: Environment variable management
- `uvicorn`: ASGI server
- `pydantic`: Data validation

## Installation

### Prerequisites
- Python 3.12+
- OpenAI API key
- Git

### Backend Setup

1. **Navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Create virtual environment** (if not already created):
   ```bash
   python -m venv venv
   ```

3. **Activate virtual environment**:
   - **Windows**:
     ```bash
     .\venv\Scripts\Activate.ps1
     ```
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```

4. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

5. **Create `.env` file**:
   ```bash
   echo OPENAI_API_KEY=your_api_key_here > .env
   ```

6. **Start the backend server**:
   ```bash
   uvicorn app.main:app
   ```
   The server will run on `http://localhost:8000`

### Frontend Setup

1. **Navigate to frontend directory**:
   ```bash
   cd frontend
   ```

2. **Start a local server** (optional, for best experience):
   ```bash
   python -m http.server 3000
   ```
   Access at `http://localhost:3000`

   Or simply open `index.html` directly in your browser.

## Usage

1. **Open the frontend** in your browser
2. **Select a target LLM** from the dropdown (GPT, Claude, or Gemini)
3. **Enter your prompt** in the textarea
4. **Click "Optimize Prompt"** to process
5. **Review the optimized prompt** in the result section
6. **Click "Copy to Clipboard"** to copy the optimized prompt

## API Endpoints

### POST /optimize

Optimizes a prompt for a specific LLM model.

**Query Parameters:**
- `user_prompt` (string, required): The prompt to optimize

**Request Body:**
```json
{
  "target_llm": "gpt",
  "user_preferences": {}
}
```

**Response:**
```json
{
  "optimized_prompt": "optimized prompt text here"
}
```

**Example:**
```bash
curl -X POST "http://localhost:8000/optimize?user_prompt=build%20an%20app" \
  -H "Content-Type: application/json" \
  -d '{"target_llm": "gpt", "user_preferences": {}}'
```

## Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```
OPENAI_API_KEY=your_openai_api_key_here
```

### Supported LLMs

- `gpt`: OpenAI's GPT models
- `claude`: Anthropic's Claude models
- `gemini`: Google's Gemini models

## Project Structure

```
PromptOptimizer/
├── backend/
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI app entry point
│   │   ├── config.py               # Configuration settings
│   │   ├── api/
│   │   │   ├── __init__.py
│   │   │   └── routes.py           # API endpoints
│   │   ├── core/
│   │   │   ├── __init__.py
│   │   │   ├── optimizer.py        # LLM optimization logic
│   │   │   └── LLM_prompts.py      # Prompt templates
│   │   └── models/
│   │       ├── __init__.py
│   │       └── schemas.py          # Pydantic models
│   ├── venv/                       # Virtual environment
│   ├── requirements.txt            # Python dependencies
│   └── .env                        # Environment variables (create this)
├── frontend/
│   ├── index.html                  # Main UI
│   ├── style.css                   # Styling
│   └── script.js                   # Client-side logic
├── .gitignore
└── README.md
```

## How It Works

1. **User submits a prompt** with target LLM selection
2. **Backend receives the request** via the `/optimize` endpoint
3. **LLM-specific template is retrieved** from `LLM_prompts.py`
4. **System prompt guides the optimization** while preserving intent
5. **OpenAI API processes the optimization**
6. **Optimized prompt is returned** to the frontend
7. **User can copy the optimized prompt** for use

## Key Features of Optimization

- **ROLE**: Sets expertise context for the LLM
- **CONTEXT**: Provides background information
- **TASK**: Clarifies the exact request (preserves action verbs)
- **FORMAT**: Specifies output structure
- **CONSTRAINTS**: Sets rules and limitations
- **DEPTH LEVEL**: Defines complexity/detail level

## Development

### Running Tests

```bash
cd backend
pytest
```

### Code Quality

```bash
# Format code
black .

# Lint code
flake8 .

# Type checking
mypy .
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `OPENAI_API_KEY` | Your OpenAI API key | Yes |

## Troubleshooting

### "Could not import module 'main'"
- Ensure you're running the command from the `backend` directory
- Use: `uvicorn app.main:app` instead of `uvicorn main:app`

### "The api_key client option must be set"
- Create a `.env` file in the `backend` directory
- Add your `OPENAI_API_KEY`
- Restart the server

### Frontend not connecting to backend
- Verify backend is running on `http://localhost:8000`
- Check CORS is enabled (it should be by default)
- Check browser console for errors

## Future Enhancements

- [ ] Support for additional LLM providers
- [ ] User authentication and prompt history
- [ ] Batch prompt optimization
- [ ] Custom optimization templates
- [ ] Rate limiting and usage analytics
- [ ] Dark mode support
- [ ] Prompt comparison feature

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues or questions, please open an issue on GitHub.

---

**Created**: January 2026
