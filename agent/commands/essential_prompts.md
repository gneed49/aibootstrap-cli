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

## review_code
```
review_code diff=<path or snippet> specs=<specs and/or changes> track=<Quick|Standard|Enterprise>
```
- Uses `prompts/review_code.md`.

## change_proposal
```
change_proposal id=<change-id> capability=<cap> scope=<short desc>
```
- Guides the agent through `agent_flow/workflow_change.md` using templates in `changes/`.
