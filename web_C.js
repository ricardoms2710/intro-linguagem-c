	var reservedWords = 
	{
        //pre_procs: [ "#include", "#define", "#ifdef", "#else", "#elif", "#endif", "#pragma" ],
		control:   [ "if", "else", "switch", "case", "default", "while", "do", "for", "break", "continue", "return"],
        type:      [ "int", "char", "float", "double", "long", "short", "unsigned", "signed", "void"],
        storage:   [ "auto", "static", "register", "extern", "const", "volatile"],
        memory:    [ "sizeof" ],
        structure: [ "struct", "union", "enum", "typedef"],
		stdio:     [ "printf", "scanf", "fprintf", "fscanf", "sprintf", "sscanf", "putchar", "getchar", "puts", "gets", "fgets", "fputs" ],
		string:    [ "strlen", "strcpy", "strncpy", "strcat", "strncat", "strcmp", "strncmp", "strchr", "strrchr", "strstr", "strtok", "memset", "memcpy", "memcmp", "memmove" ],
		stdlib:    [ "malloc", "calloc", "realloc", "free", "atoi", "atof", "atol", "strtol", "strtoul", "strtod", "exit", "abs", "labs", "rand", "srand" ],
		math:      [ "abs", "fabs", "ceil", "floor", "round", "sqrt", "pow", "exp", "log", "log10", "sin", "cos", "tan", "asin", "acos", "atan", "atan2", "rand", "srand" ],
		time:      [ "time", "mktime", "difftime", "clock" ]
        // , pointer: ["*", "->"]
    };

// ******************************************************
function countReservedWords() 
{
    var codeElement = document.getElementById("c-code");
    var code = codeElement.innerText || codeElement.textContent;
   
    var counts = 
	{
        control: 0,
        type: 0,
        storage: 0,
        memory: 0,
        structure: 0,
        include: 0,
        pointer: 0
    };

    Object.keys(reservedWords).forEach(function(type) 
	{
        reservedWords[type].forEach(function(word) 
		{
            var regex = new RegExp("\\b" + word + "\\b", "g");
            var matches = code.match(regex);
            if (matches) 
			{
                counts[type] += matches.length;
            }
        });
		
    });

    console.log(counts);
}

// ******************************************************
function highlightReservedWords() 
{
    var codeElement = document.getElementById("c-code");
    var code = codeElement.innerHTML;

    for (var type in reservedWords) 
	{
        reservedWords[type].forEach(function(word) 
		{
            var regex = new RegExp("(\\b" + word + "\\b)", "g");
            code = code.replace(regex, "<span class='code-" + type + "'>$1</span>");
        });
    }
	
	var regex = new RegExp("(\\s*#(?:include|define|ifdef|ifndef|endif|else|if|elif|pragma)\\b)", "g");
    code = code.replace(regex, "<span class='code-pre_proc'>$1</span>");

    codeElement.innerHTML = code;
}

// ******************************************************
function highlight_LineComments() 
{
    var codeElement = document.getElementById("c-code");
    var codeLines = codeElement.innerHTML.split("\n");
	var linha = "";

    for (var i = 0; i < codeLines.length; i++) 
	{
        if (codeLines[i].trim().startsWith("//")) 
		{
            codeLines[i] = "<span class='code-Line_comment'>" + codeLines[i] + "</span>";
        }
    }

    codeElement.innerHTML = codeLines.join('\n');
}

// ******************************************************
function highlight_MultiLineComments() 
{
    var codeElement = document.getElementById("c-code");
    var code = codeElement.innerHTML;

    // Usando uma expressão regular para encontrar todos os trechos de comentários multi-linha
    var regex = /\/\*[\s\S]*?\*\//g;
    code = code.replace(regex, function(match) 
	{
        return "<span class='code-MultiLine_comment'>" + match + "</span>";
    });

    codeElement.innerHTML = code;
}

// ******************************************************
function alternateBackground() 
{
    var codeElement = document.getElementById("c-code");
    var codeLines = codeElement.innerHTML.split("\n");

    for (var i = 0; i < codeLines.length-1; i++) 
	{
        if (i % 2 === 0) 
		{
            codeLines[i] = "<div class='linha light-gray'>" + codeLines[i] + "</div>";
        } 
		else 
		{
            codeLines[i] = "<div class='linha light-blue'>" + codeLines[i] + "</div>";
        }
    }

    codeElement.innerHTML = codeLines.join('\n');
}

// ******************************************************
function transferContent() 
{
    var codeElement = document.getElementById('c-code');
    var codeLines = codeElement.innerHTML.split('\n');
		
	var programaDiv = document.getElementById('programa');

    for (var i = 0; i < codeLines.length; i++) 
	{
        var linhaDiv = document.createElement('div');
        linhaDiv.id = 'linha_' + (i + 1);
		
        if (i % 2 === 0) 
		{
            linhaDiv.style.className = "light-gray";
        } 
		else 
		{
            linhaDiv.style.className = "light-blue";
        }
		
        linhaDiv.innerHTML = codeLines[i];
        programaDiv.appendChild(linhaDiv);
    }
}

// ******************************************************
function countLinesAndInsertNumbers() 
{
    var codeElement = document.getElementById("c-code");
    var linesElement = document.getElementById("c-lines");

    var codeContent = codeElement.innerText;
    var lineCount = codeContent.split("\n").length-1;

    var lineNumbers = "";
    for (var i = 1; i <= lineCount; i++) 
	{
        lineNumbers += i + ":\n";
    }

    linesElement.innerText = lineNumbers;
}

// ******************************************************
// ******************************************************
window.onload = function() 
{
	//~~~~ countReservedWords();
	
    highlightReservedWords();
	
	highlight_LineComments();
	highlight_MultiLineComments();
	
	countLinesAndInsertNumbers();
	
	alternateBackground();
	
	//transferContent();
    
};
