# CSC1184 – Programming for Data Analysis  
**12-Week Teaching Plan (Lecture + Lab)**

- **Assumed background:** Students completed a first-year Python module (variables, control flow, simple functions, basic lists).
- **Structure each week:**  
  - 2-hour lecture – concepts, worked examples, short in-class questions.  
  - 2-hour lab – guided exercises, short tasks, practical reinforcement.

---

## Week 1 – Data Analysis Mindset & Python Warm-Up

### Learning Outcomes
By the end of Week 1, students should be able to:

- Explain what “programming for data analysis” means and how it differs from general programming.
- Use basic terms: dataset, observation (row), variable (column), numeric vs categorical.
- Represent a tiny dataset using core Python structures (lists and dictionaries).
- Write small Python functions that answer simple questions about a list of numbers.

### Lecture (2h)

**Conceptual blocks:**

1. **Course orientation (CSC1184 as 2nd-year follow-on)**
   - How this module builds on first-year programming.
   - Rough 12-week arc: from “data-centric Python” → statistics & models → mini project.
   - Types of questions we care about:
     - “Do lab attendance and exam marks seem related?”
     - “How do sales vary over time?”
     - “Which features are most predictive of an outcome?”

2. **Data analysis vocabulary**
   - Dataset as a table:
     - Row = observation (student, transaction, match, etc.).
     - Column = variable (age, mark, programme, category, etc.).
   - Variable types:
     - Numeric, categorical, time-based.
   - Why variable type matters (choice of plot, statistic, model).

3. **Representing tiny datasets in Python**
   - Lists of numbers:
     - `scores = [55, 62, 71, 48, 90]`.
     - Built-ins: `len`, `sum`, `min`, `max`.
   - List of dictionaries to represent rows:
     - `{"id": 1, "programme": "CS", "exam_score": 55, "labs_attended": 6}`.
   - Trade-offs: readability, extensibility, connection to real tables.

4. **Simple questions about data using plain Python**
   - Compute:
     - average score,
     - max/min score,
     - number of scores above a threshold.
   - Write 1–2 small functions, e.g.:
     - `count_passing(scores, threshold=60)`
     - `average(values)`

5. **Preview of tools**
   - Browser-based playground vs local Python environment.
   - “For small examples in lecture, browser is fine. For bigger datasets, you’ll use local Python with `numpy`/`pandas`.”

**In-lecture mini activities:**

- Students sketch a simple dataset from their own life (e.g. 10 matches, 10 meals, 10 study sessions) as a table: what are rows? what are columns?
- Turn that sketch into Python:
  - a list of numbers, or
  - a list of small dictionaries.

### Lab (2h)

**Goals:**

- Check that everyone can run code (browser + local if possible).
- Warm-up with simple list-based analysis.
- Reinforce idea that code answers questions about data.

**Tasks:**

- Represent a mini “student dataset” as:
  - list of exam scores, and
  - list of dicts (`id`, `exam_score`, `labs_attended`).
- Write functions:
  - `average_score(students)`
  - `count_above(students, threshold)`
  - `best_student(students)` returning the row with max `exam_score`.
- Small reflection at the end:
  - “What question did your code answer?”
  - “How would you phrase that question in English?”

---

## Week 2 – Files, CSVs & Simple Tabular Data

### Learning Outcomes

By the end of Week 2, students should be able to:

- Use `with open(...)` to read text files safely.
- Explain and use `.read()`, `.readlines()`, and iterating line-by-line.
- Manually parse a simple CSV file without external libraries.
- Store CSV rows as list-of-dicts and convert selected fields to numeric types.
- Write small reusable functions that load and summarise data from CSV.

### Lecture (2h)

**Conceptual blocks:**

1. **Why files?**
   - Hard-coded lists vs real-world data in files.
   - File paths, extensions (`.txt`, `.csv`).

2. **Text file basics**
   - `with open(path, "r", encoding="utf-8") as f:`
   - Patterns:
     - `f.read()` vs `f.readlines()` vs `for line in f:`
   - `.strip()` to remove newline and whitespace.
   - Skipping empty lines.

3. **What is CSV?**
   - Structure: header row + data rows.
   - Example: `id,name,programme,exam_score,labs_attended`.
   - Role of the comma as separator; mention other possible delimiters briefly.

4. **Manual CSV parsing**
   - Read the header separately, `header = f.readline()`.
   - For each subsequent line:
     - strip → split by `","` → list of strings.
   - Convert types:
     - `int(parts[0])`, `float(...)` where needed.
   - Two representations:
     - list of lists vs list of dicts (`dict(zip(header, parts))`).
   - Advantages of list-of-dicts (names instead of numeric indices).

5. **Reusable loader function pattern**
   - `def load_students_csv(path): ...`
   - Encapsulate:
     - opening file,
     - reading header,
     - looping over lines,
     - type conversions.
   - Light introduction of error handling for bad lines:
     - `try/except` around `int(...)`.
     - Policy: skip bad row vs warn & keep partial data.

6. **Simple summaries on loaded data**
   - Given `students = load_students_csv("students.csv")`, compute:
     - average exam score,
     - count passing,
     - max / min.
   - These mirror Week-1 logic, but now data comes from a file.

### Lab (2h)

**Tasks:**

- Given `students.csv`:
  1. Open it, print header and first few lines “raw”.
  2. Build list-of-dicts with proper numeric fields.
  3. Implement:
     - `average_exam_score(students)`
     - `count_students_in_programme(students, prog)`
     - `students_above_threshold(students, threshold)`
- Extension:
  - Write a `save_passing_students(students, "passing.csv", threshold)` function that writes a new CSV with only passing students.
- Emphasis on:
  - consistent style,
  - comments describing what each function is doing conceptually (not just “loop”).

---

## Week 3 – NumPy Arrays & Vectorised Operations

### Learning Outcomes

By the end of Week 3, students should be able to:

- Explain the difference between Python lists and NumPy arrays.
- Create arrays from Python lists and using NumPy constructors.
- Use array indexing, slicing, and boolean masking.
- Apply vectorised operations and basic aggregations (`mean`, `std`, etc.).
- Move data from manually parsed CSV into NumPy arrays.

### Lecture (2h)

**Conceptual blocks:**

1. **Why NumPy?**
   - Lists are flexible but slow for large numeric operations.
   - Arrays as contiguous numeric storage with efficient operations.
   - Rough idea of shape and dtype.

2. **Creating arrays**
   - `np.array([1, 2, 3])`, `np.zeros(...)`, `np.ones(...)`, `np.arange`, `np.linspace`.
   - Simple reshaping idea: 1D vs 2D glimpses (no full linear algebra yet).

3. **Indexing, slicing, masks**
   - Indexing by position: `a[0]`, `a[1:4]`.
   - Boolean masks: `mask = a > 10`, `a[mask]`.
   - Connecting masks back to “questions”:
     - “Give me only the scores above 60.”

4. **Vectorised operations**
   - Element-wise arithmetic vs Python loops.
   - Aggregations: `.mean()`, `.sum()`, `.std()`, `.min()`, `.max()`.
   - Compare list-loop vs array vectorisation for the same task.

5. **From CSV to arrays**
   - Take numeric column from Week-2 loader and convert to array:
     - `scores = np.array([row["exam_score"] for row in students])`.
   - Show that operations become shorter and clearer with arrays.

6. **Small simulation example**
   - Simulate coin flips, or exam scores:
     - `np.random` usage (very basic).
   - Summarise simulated results with array methods.

### Lab (2h)

**Tasks:**

- Use Week-2 CSV dataset:
  - Extract one or two numeric columns into arrays.
  - Compute:
    - mean, standard deviation, min, max, median (using NumPy).
  - Use masks:
    - filter scores above / below thresholds,
    - count how many satisfy a condition.
- Small simulation:
  - generate random dataset (e.g. 1000 random exam scores),
  - compare simulated mean/std with theoretical expectations.

---

## Week 4 – pandas: Series, DataFrames & Basic Indexing

### Learning Outcomes

By the end of Week 4, students should be able to:

- Create a `DataFrame` from dictionaries, lists, or CSV.
- Inspect a dataset with `head`, `info`, `describe`.
- Select and filter columns and rows.
- Understand the difference between label-based (`.loc`) and position-based (`.iloc`) selection.

### Lecture (2h)

**Conceptual blocks:**

1. **Motivation for pandas**
   - Working with tabular data is awkward via raw lists/arrays.
   - DataFrames as “tables with labels”.
   - Relationship with NumPy (DataFrame built on arrays).

2. **Basic DataFrame creation**
   - From dict of lists, list of dicts.
   - From `pd.read_csv(...)`:
     - file reading is now one line.

3. **Quick dataset overview**
   - `df.head()`, `df.tail()`, `df.shape`, `df.info()`, `df.describe()`.
   - Data types: `int`, `float`, `object`.

4. **Column and row selection**
   - Columns: `df["exam_score"]`, `df.exam_score`.
   - Rows:
     - `.loc[row_label]` / `.loc[row_start:row_end]`,
     - `.iloc[row_index]` / `.iloc[start:end]`.
   - Simple boolean filtering:
     - `df[df["exam_score"] >= 60]`.

5. **Sorting & new columns**
   - `df.sort_values("exam_score")`.
   - Derived columns:
     - `df["normalized_score"] = df["exam_score"] / df["exam_score"].max()`.

6. **Comparison with plain lists / arrays**
   - Same tasks as previous weeks, now using pandas.
   - Show how much shorter / more readable the code becomes.

### Lab (2h)

**Tasks:**

- Load a provided CSV into a DataFrame.
- Perform:
  - Basic inspection (`head`, `info`, `describe`).
  - Filtering: “students with exam_score ≥ 60”, “students from programme X”.
  - Sorting by exam_score and labs_attended.
  - Add a new column (e.g. pass/fail flag or a scaled score).
- Small “mini-report” printed in terminal:
  - 2–3 sentences summarising what they found (mean, count passing, etc).

---

## Week 5 – Grouped Aggregations & Joins

### Learning Outcomes

By the end of Week 5, students should be able to:

- Use `groupby` to compute grouped summaries.
- Use `value_counts` to summarise categories.
- Merge/join two related DataFrames based on a key.
- Understand the purpose of joins in combining information from multiple tables.

### Lecture (2h)

**Conceptual blocks:**

1. **Grouped questions**
   - “Average exam score per programme.”
   - “Total sales per product category.”
   - “Number of records per label.”

2. **Groupby basics**
   - `df.groupby("programme")["exam_score"].mean()`.
   - Multiple aggregations with `.agg(["mean", "count"])`.
   - Resetting index if needed.

3. **`value_counts` and proportions**
   - `df["programme"].value_counts()`.
   - Normalised counts (`normalize=True`) to get proportions.

4. **Joining tables**
   - Conceptual diagram: primary key / foreign key.
   - `pd.merge` usage:
     - `merge(df_orders, df_customers, on="customer_id", how="inner")`.
   - Very light explanation of inner vs left joins.

5. **Small pipeline**
   - Two CSVs (e.g. orders and products):
     - load,
     - merge,
     - group,
     - summarise.

### Lab (2h)

**Tasks:**

- Given 2–3 CSVs (customers, orders, products):
  - Load each into DataFrame.
  - Merge appropriately (e.g. customers ↔ orders).
  - Compute:
    - total spend per customer,
    - average order value,
    - top N products by revenue.
  - Use `groupby` + `.agg` and `value_counts`.
- Document 2–3 findings in comments (in plain English).

---

## Week 6 – Data Cleaning & Tidy Data

### Learning Outcomes

By the end of Week 6, students should be able to:

- Identify missing values and inconsistent entries.
- Use `isna`, `notna`, `dropna`, and `fillna` appropriately.
- Convert data types, especially strings → numeric and strings → dates.
- Explain the idea of “tidy data” (rows = observations, columns = variables).

### Lecture (2h)

**Conceptual blocks:**

1. **Messy data realities**
   - Missing values, wrong types, inconsistent categories.
   - Why cleaning is often the longest step in a project.

2. **Missing data in pandas**
   - `df.isna().sum()` for column-wise NA counts.
   - Strategies:
     - Drop rows (`dropna`) vs impute (`fillna`).
   - Discussion of when each strategy makes sense.

3. **Type conversion & dates**
   - `df["col"].astype(float)` / `astype(int)` (and potential issues).
   - `pd.to_datetime(...)` for date columns:
     - parsing formats,
     - extracting year/month/day.

4. **Simple string cleaning**
   - `.str.strip()`, `.str.lower()`, `.str.replace(...)`.
   - Example: clean category names with inconsistent case or trailing spaces.

5. **Tidy data concept**
   - Each column = variable, each row = observation.
   - Show a non-tidy example and the tidy version.
   - How tidy structure simplifies downstream analysis.

### Lab (2h)

**Tasks:**

- Provide a “messy” CSV:
  - mixture of missing entries,
  - numeric fields stored as strings,
  - inconsistent category labels,
  - date column as text.
- Students:
  - Inspect missingness and types (`info`, `isna`).
  - Clean:
    - unify categories (using string methods),
    - convert columns to useful types,
    - decide how to handle missing values (drop vs fill).
  - Output:
    - cleaned DataFrame,
    - saved “cleaned.csv” file,
    - short note (comments) describing what they chose to do and why.

---

## Week 7 – Exploratory Data Analysis (EDA) & Visualisation

### Learning Outcomes

By the end of Week 7, students should be able to:

- Choose appropriate visualisations for basic variable types.
- Use pandas/matplotlib to produce simple plots.
- Interpret plots in plain language (central tendency, spread, outliers, trends).

### Lecture (2h)

**Conceptual blocks:**

1. **Purpose of EDA**
   - Understand data before modelling.
   - Spot errors, outliers, patterns, and relationships.

2. **Basic plots with pandas/matplotlib**
   - Histograms for numeric variables.
   - Boxplots for distributions & outliers.
   - Scatter plots for two numeric variables.
   - Bar charts for categorical counts.

3. **Reading plots**
   - “What is typical here?” (centre, spread).
   - “Are there obvious outliers?”
   - “What trends or patterns do we see?”

4. **Common pitfalls**
   - Misleading axes.
   - Overplotting.
   - Small-sample weirdness.

5. **Light style choices**
   - Avoid over-complicating plots; focus on legibility.

### Lab (2h)

**Tasks:**

- Using the cleaned dataset from Week 6 (or a similar one):
  - Plot:
    - histogram of a key numeric variable,
    - boxplot of same variable by category,
    - scatter plot for two related numeric variables.
  - For each plot:
    - write 2–3 comments interpreting what they see.
- Optional extension:
  - try different bin sizes,
  - compare different subsets.

---

## Week 8 – Descriptive Statistics & Correlation

### Learning Outcomes

By the end of Week 8, students should be able to:

- Compute and interpret mean, median, variance, standard deviation, and quantiles.
- Use `describe` and individual methods (`mean`, `median`, `std`, etc.) in pandas.
- Compute a correlation matrix and interpret values in context.
- Understand limitations: correlation ≠ causation.

### Lecture (2h)

**Conceptual blocks:**

1. **Descriptive statistics**
   - Central tendency: mean vs median.
   - Spread: variance, standard deviation, IQR.
   - `df.describe()` vs manual extraction.

2. **Computing stats in code**
   - Column-wise operations:
     - `df["col"].mean()`, `.median()`, `.std()`, `.quantile()`.
   - Group-wise stats (if needed, quickly revisit `groupby` with `.mean()` etc.).

3. **Correlation**
   - Definition of correlation (intuitive).
   - `df.corr()` for numeric columns.
   - Interpreting correlation coefficients:
     - strong/weak, positive/negative, near zero.

4. **Limitations**
   - Correlation ≠ causation.
   - Outliers affecting correlation.
   - Nonlinear relationships.

5. **Link to visualisation**
   - Use scatter plots + correlation side by side.

### Lab (2h)

**Tasks:**

- For a dataset with several numeric variables:
  - Compute descriptive statistics per variable.
  - Generate correlation matrix.
  - Identify:
    - strongest positive,
    - strongest negative,
    - near-zero correlations.
  - Verify at least one pair visually with a scatter plot.
- Reflection:
  - students describe 1–2 relationships they see, in normal language.

---

## Week 9 – Distributions, Sampling & Simple Inference (Light)

### Learning Outcomes

By the end of Week 9, students should be able to:

- Distinguish between population and sample.
- Explain the idea of sampling variability and confidence intervals (intuitively).
- Perform a simple hypothesis test using a library function or simple simulation.
- Interpret p-values and confidence intervals in words.

### Lecture (2h)

**Conceptual blocks:**

1. **Population vs sample**
   - Why we use samples.
   - Sample mean as an estimate.

2. **Sampling variability**
   - Thought experiment: “What if we repeatedly sampled 50 students and computed the mean mark?”
   - Simple simulation with NumPy to illustrate.

3. **Confidence intervals (conceptual)**
   - Interval as “range of plausible values” for the population mean.
   - Computation using a library or given formula (no derivation required).

4. **Hypothesis testing (one or two simple cases)**
   - Null vs alternative.
   - p-value as measure of compatibility with null.
   - Example:
     - “Is the average mark different from 60?”
     - “Do two groups have different average scores?”

5. **Emphasis on interpretation**
   - Plain-English statements rather than formulas.

### Lab (2h)

**Tasks:**

- Using a numeric column as a sample:
  - construct a confidence interval for the mean,
  - perform a simple one-sample or two-sample test.
- Write interpretations such as:
  - “We are reasonably confident the true mean is between X and Y.”
  - “At the 5% level, we [do/do not] have evidence that the mean differs from 60.”
- Optional:
  - simple bootstrap or repeated sampling with NumPy to visualise variability.

---

## Week 10 – Linear Regression

### Learning Outcomes

By the end of Week 10, students should be able to:

- Explain the idea of linear regression as fitting a line to data.
- Fit a simple linear regression model in Python.
- Interpret slope, intercept, and R² qualitatively.
- Use regression for basic prediction tasks.

### Lecture (2h)

**Conceptual blocks:**

1. **Motivation**
   - Relationship between two variables (e.g. hours studied vs exam score).
   - Idea of “best-fitting line”.

2. **Model form**
   - \( y = \beta_0 + \beta_1 x + \epsilon \) (no heavy algebra).
   - Slope = change in y per unit change in x.
   - Intercept = predicted value when x = 0 (context dependent).

3. **Fitting the model**
   - Use `scikit-learn` (or similar) to:
     - split into `X` and `y`,
     - fit `LinearRegression`,
     - obtain coefficients.
   - Visualise line over scatter plot.

4. **Model evaluation**
   - R² as “proportion of variance explained”.
   - Residuals as errors: actual − predicted.

5. **Multiple regression (high level)**
   - Using more than one predictor,
   - caution about over-interpretation.

### Lab (2h)

**Tasks:**

- Choose dataset with a reasonable numeric target.
- Students:
  - pick one predictor variable and fit simple linear regression,
  - inspect coefficients and R²,
  - generate a few predictions and compare with actual values,
  - optionally add a second predictor and observe changes.
- Reflection:
  - “What does the slope mean in context?”
  - “Does this model fit well enough for our purposes?”

---

## Week 11 – Classification & Model Evaluation

### Learning Outcomes

By the end of Week 11, students should be able to:

- Distinguish regression and classification tasks.
- Fit a simple classifier (e.g. logistic regression or k-NN).
- Use train/test split for evaluation.
- Interpret confusion matrices and accuracy, with awareness of limitations.

### Lecture (2h)

**Conceptual blocks:**

1. **Classification vs regression**
   - Examples: spam vs not spam, pass vs fail.

2. **Basic classifier**
   - Choose one approach (e.g. logistic regression or k-NN).
   - Data preparation:
     - features `X`,
     - target labels `y`.
   - Train/test split.

3. **Model training & prediction**
   - Fit classifier on training data.
   - Predict on test data.

4. **Evaluation**
   - Confusion matrix.
   - Accuracy.
   - Brief mention:
     - precision, recall, F1 (at least at conceptual level).

5. **Issues and caveats**
   - Class imbalance.
   - Overfitting (very high-level description only).

### Lab (2h)

**Tasks:**

- Use clear binary dataset (e.g. survival, pass/fail).
- Students:
  - create train/test split,
  - fit classifier,
  - compute accuracy and confusion matrix,
  - inspect some misclassified examples.
- Short written answer in comments:
  - “Is this model good enough? Why or why not?”

---

## Week 12 – Mini Project & Revision

### Learning Outcomes

By the end of Week 12, students should be able to:

- Carry out a small end-to-end analysis on a dataset.
- Communicate findings clearly in code comments and short text.
- Reflect on which steps of the data analysis pipeline are strongest/weakest for them.

### Lecture (2h)

**Conceptual blocks:**

1. **End-to-end walkthrough**
   - Choose a small dataset and demonstrate:
     - loading,
     - cleaning,
     - EDA / plots,
     - fitting a simple model (regression or classification),
     - summarising findings.

2. **Common pitfalls and “gotchas”**
   - Over-trusting models,
   - ignoring missing data,
   - misreading correlations,
   - lack of proper evaluation.

3. **Revision**
   - Structured recap of:
     - data structures (lists, arrays, DataFrames),
     - EDA & stats,
     - basic models,
     - coding patterns (functions, loaders).

4. **Q&A**
   - Address exam or assessment-related questions,
   - revisit tricky conceptual points.

### Lab (2h)

**Mini-project session:**

- Students work individually or in pairs on a small dataset (can choose from several options provided).
- Required steps (scaled to your assessment constraints):
  1. Load the data into pandas.
  2. Perform basic cleaning (handle missing, types).
  3. Conduct EDA with at least:
     - one numeric summary,
     - one meaningful plot.
  4. Fit one simple model (regression or classification).
  5. Summarise in a short “report” (could be comments in code or a few paragraphs) covering:
     - the question they chose,
     - what they did,
     - what they found,
     - any limitations.

- Time at end for a few volunteers to briefly present or discuss their process.

---