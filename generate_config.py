"""change the units in base_config based off other yaml files"""
import argparse
import yaml

def main(update_configs):
    with open('base_units.yaml', 'r') as f:
        base_units = yaml.safe_load(f)

    update_config = {}
    for config in update_configs:
        with open(config, 'r') as f:
            _update_config = yaml.safe_load(f)
        for key in _update_config.keys():
            assert key not in update_config
        
        update_config.update(_update_config)
    
    base_units["units"].update(update_config)
    with open("config.yaml", "w") as f:
        f.write(yaml.dump(base_units))
    with open("base_config.yaml", "r") as f:
        base_config = f.read()
    with open("config.yaml", "a") as f:
        f.write("\n")
        f.write(base_config)


def parse_args():
    parser = argparse.ArgumentParser()
    parser.add_argument('changes', nargs='*', 
                        help='path to yaml with all changes to apply to base_config.yaml')
    args = parser.parse_args()
    return args.changes

if __name__ == "__main__":
    update_configs = parse_args()
    main(update_configs)