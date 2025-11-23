# Essential prompts (CLI-friendly)
Common developer prompts to streamline work. Provide required args after the command.

## implement_feature
```
implement_feature spec=<spec path> files=<file list>
```
- Reads context, constraints, tools, rules.
- Runs prompt `prompts/implement_feature_from_spec.md`.

## implement_api
```
implement_api spec=<spec path> files=<file list>
```
- Uses `prompts/implement_api_from_spec.md`.

## implement_ui
```
implement_ui spec=<spec path> files=<file list>
```
- Uses `prompts/implement_ui_from_screen_spec.md`.

## add_tests
```
add_tests target=<module path> specs=<spec list?>
```
- Uses `prompts/add_tests_for_module.md`.

## refactor_module
```
refactor_module target=<module path> specs=<spec list?>
```
- Uses `prompts/refactor_module_with_rules.md`.

## document_module
```
document_module target=<module path> specs=<spec list?>
```
- Uses `prompts/document_module_from_code.md`.
